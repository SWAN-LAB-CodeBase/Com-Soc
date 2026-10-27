"use client";

import { useEffect, useRef } from "react";
import { createSpring, prefersReducedMotion } from "@/lib/spring";

/**
 * A number that counts up on a critically damped spring the first time it
 * scrolls into view. The server renders the final value, so it is correct
 * without JavaScript; assistive tech always reads the final value.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || value <= 1) return;
    // Only animate numbers that start off-screen; never rewind a visible one.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const spring = createSpring(0, (v) => (el.textContent = String(Math.round(v))), {
      response: 0.9,
      dampingRatio: 1,
    });
    spring.jump(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        spring.set(value);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      spring.stop();
      el.textContent = String(value);
    };
  }, [value]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="visually-hidden">{value}</span>
    </span>
  );
}
