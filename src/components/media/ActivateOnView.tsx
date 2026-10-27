"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { prefersReducedMotion } from "@/lib/spring";

/**
 * An <ol> that plays a one-time entrance when it first becomes half
 * visible. It sets `data-armed` once motion is allowed (so CSS can hide the
 * start state) and `data-active` when it enters view. Without JavaScript or
 * with reduced motion it never arms, so the content simply shows complete.
 */
export function ActivateOnView({ children, ...rest }: ComponentPropsWithoutRef<"ol">) {
  const ref = useRef<HTMLOListElement>(null);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    // Arming after mount is the point: the server render shows the finished state.
    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} data-armed={armed || undefined} data-active={active || undefined} {...rest}>
      {children}
    </ol>
  );
}
