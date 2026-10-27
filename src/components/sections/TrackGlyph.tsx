import type { ReactNode } from "react";
import type { Track } from "@/content/types";

/**
 * Small line diagrams that sketch each track's networking idea. Decorative:
 * the track title and description carry the meaning.
 */
export function TrackGlyph({ glyph }: { glyph: Track["glyph"] }) {
  return (
    <svg
      viewBox="0 0 96 96"
      width="96"
      height="96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[glyph]}
    </svg>
  );
}

const node = (cx: number, cy: number, r = 5) => (
  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
);

const GLYPHS: Record<Track["glyph"], ReactNode> = {
  // Community mesh: every node reaches its neighbours; one link runs out to backhaul.
  mesh: (
    <>
      <path d="M20 62 40 40l22 8 16-22M20 62l28 12 14-26M40 40l8 34M62 48l10 22" opacity="0.55" />
      <path d="M78 26 88 12" strokeDasharray="3 5" />
      {[node(20, 62), node(40, 40), node(62, 48), node(78, 26), node(48, 74), node(72, 70)]}
    </>
  ),
  // A broken primary link with a recovery path routed around it.
  resilience: (
    <>
      <path d="M18 60h22M56 60h22" />
      <path d="M44 54l8 12M52 54l-8 12" opacity="0.55" />
      <path d="M18 60C18 28 78 28 78 60" strokeDasharray="4 6" />
      {[node(18, 60, 6), node(78, 60, 6)]}
    </>
  ),
  // A low-power sensor sending long-range, low-rate signals.
  lowpower: (
    <>
      <rect x="16" y="52" width="20" height="28" rx="4" />
      <path d="M22 48v-6h8v6" />
      <path d="M21 72h10" opacity="0.55" />
      <path
        d="M46 46a14 14 0 0 1 0 20M56 38a26 26 0 0 1 0 36M66 30a38 38 0 0 1 0 52"
        opacity="0.7"
      />
    </>
  ),
  // Resource allocation: a dial balancing load across links.
  optimise: (
    <>
      <path d="M18 66a30 30 0 0 1 60 0" />
      <path d="M24 66h-6M78 66h-6M48 36v6M27 45l4 4M69 45l-4 4" opacity="0.55" />
      <path d="M48 66 62 46" />
      {node(48, 66, 6)}
    </>
  ),
  // One network fanning out to farm, clinic and classroom.
  inclusion: (
    <>
      <path d="M48 54V40M48 54 24 72M48 54l24 18" opacity="0.6" />
      {node(48, 54, 6)}
      <path d="M48 36c-6-10 2-20 10-20 0 10-4 18-10 20Z" />
      <path d="M18 70h12v12H18zM24 73v6M21 76h6" />
      <path d="M66 70l6-4 6 4v12H66z" />
    </>
  ),
};
