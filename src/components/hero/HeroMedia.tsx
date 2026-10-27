"use client";

import { useRef, type ReactNode } from "react";
import { usePointerSpring } from "@/lib/use-pointer-spring";
import styles from "./Hero.module.css";

/**
 * Pointer parallax for the hero photograph. The photo and its network
 * overlay move together (so links stay on the tower) on critically damped
 * springs, drifting against the pointer to suggest depth behind the copy.
 */
export function HeroMedia({ children }: { children: ReactNode }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  usePointerSpring(
    areaRef,
    (x, y) => {
      const layer = layerRef.current;
      if (layer) layer.style.transform = `translate3d(${x * -14}px, ${y * -10}px, 0)`;
    },
    { scope: "section", response: 0.6, dampingRatio: 1 },
  );

  return (
    <div ref={areaRef} className={styles.pointerArea}>
      <div ref={layerRef} className={styles.pointerLayer}>
        {children}
      </div>
    </div>
  );
}
