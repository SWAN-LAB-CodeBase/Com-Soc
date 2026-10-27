import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import styles from "./Media.module.css";

interface RevealImageProps {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** CSS aspect-ratio for the frame, e.g. "4 / 3". */
  ratio?: string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
}

/**
 * A framed photograph that opens from an inset as it scrolls into view while
 * the image inside drifts slowly (parallax). Both effects are CSS
 * scroll-driven animations: no JavaScript, and nothing hidden when the
 * browser lacks support or the user prefers reduced motion.
 */
export function RevealImage({
  src,
  alt,
  sizes,
  ratio = "4 / 3",
  className,
  priority = false,
  children,
}: RevealImageProps) {
  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(" ")}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className={styles.image}
      />
      {children}
    </div>
  );
}
