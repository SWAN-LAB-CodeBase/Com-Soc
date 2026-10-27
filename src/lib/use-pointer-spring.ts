"use client";

import { useEffect, type RefObject } from "react";
import { createSpring, hasFinePointer, prefersReducedMotion, type SpringOptions } from "./spring";

/**
 * Tracks the pointer over `ref` (or its enclosing <section> when
 * `scope: "section"`) as normalised x/y in [-1, 1] and feeds each axis
 * through its own spring. Leaving the element springs back to centre.
 * Only active for fine hovering pointers and when motion is allowed — touch
 * users scroll, they don't hover.
 */
export function usePointerSpring(
  ref: RefObject<HTMLElement | null>,
  onFrame: (x: number, y: number) => void,
  { scope = "element", ...options }: SpringOptions & { scope?: "element" | "section" } = {
    response: 0.6,
    dampingRatio: 1,
  },
) {
  useEffect(() => {
    const el = scope === "section" ? (ref.current?.closest("section") ?? null) : ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    let x = 0;
    let y = 0;
    const sx = createSpring(0, (v) => ((x = v), onFrame(x, y)), options);
    const sy = createSpring(0, (v) => ((y = v), onFrame(x, y)), options);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      sx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      sy.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => {
      sx.set(0);
      sy.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      sx.stop();
      sy.stop();
    };
    // onFrame/options are treated as stable for the element's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, scope]);
}
