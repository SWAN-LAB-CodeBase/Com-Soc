import type { CSSProperties } from "react";

/** Inline style that staggers a scroll reveal by sibling position (see globals.css). */
export function stagger(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
