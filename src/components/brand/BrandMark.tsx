import Image from "next/image";

/**
 * The RuralConnect wordmark logo — includes the "RuralConnect" text, leaves
 * and wifi mark in a single horizontal image. Pass `size` as the rendered
 * height in CSS pixels; width scales from the natural aspect ratio (865:288).
 */
const LOGO_RATIO = 865 / 288;

export function BrandMark({ size = 32 }: { size?: number }) {
  const height = size;
  const width = Math.round(height * LOGO_RATIO);
  return (
    <Image
      src="/images/ruralconnect-logo.png"
      alt="RuralConnect"
      height={height}
      width={width}
      priority
      style={{ height: `${height}px`, width: "auto" }}
    />
  );
}
