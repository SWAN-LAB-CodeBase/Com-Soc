"use client";

import { useRef, type ReactNode } from "react";
import { usePointerSpring } from "@/lib/use-pointer-spring";
import styles from "./Media.module.css";

/**
 * Tilts its content toward the pointer in 3D, with a soft light glint that
 * follows. Each axis rides a critically damped spring, so the surface
 * responds instantly, never overshoots, and eases home when the pointer
 * leaves. Mouse/trackpad only; static for touch and reduced motion.
 */
export function TiltSurface({
  children,
  className,
  maxTilt = 4,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  usePointerSpring(
    ref,
    (x, y) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `perspective(1000px) rotateX(${(-y * maxTilt).toFixed(3)}deg) rotateY(${(x * maxTilt * 1.25).toFixed(3)}deg)`;
      el.style.setProperty("--glint-x", `${((x + 1) * 50).toFixed(1)}%`);
      el.style.setProperty("--glint-y", `${((y + 1) * 50).toFixed(1)}%`);
      el.style.setProperty("--glint-opacity", Math.min(1, Math.hypot(x, y)).toFixed(3));
    },
    { response: 0.45, dampingRatio: 1 },
  );

  return (
    <div ref={ref} className={[styles.tilt, className].filter(Boolean).join(" ")}>
      {children}
      <span className={styles.glint} aria-hidden="true" />
    </div>
  );
}
