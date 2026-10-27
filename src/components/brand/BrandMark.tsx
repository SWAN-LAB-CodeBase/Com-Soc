/**
 * The two-tone sphere mark: dark teal over network blue, split on a gentle
 * tilt. Decorative — always paired with the visible event name. Uses no
 * gradient/clip ids, so any number of instances can share a page.
 */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="15" fill="#0B6E66" />
      <path d="M1.23 18.6Q16 20.5 30.77 13.4A15 15 0 0 1 1.23 18.6Z" fill="#1D4ED8" />
      <ellipse
        cx="11"
        cy="9.5"
        rx="6"
        ry="3.6"
        fill="#fff"
        opacity="0.35"
        transform="rotate(-25 11 9.5)"
      />
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="#06112B" strokeOpacity="0.35" />
    </svg>
  );
}
