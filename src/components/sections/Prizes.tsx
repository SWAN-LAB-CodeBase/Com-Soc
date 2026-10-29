import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/lib/stagger";
import styles from "./Prizes.module.css";

const TIERS: { rank: string; label: string; tone: "gold" | "silver" | "bronze"; icon: ReactNode }[] =
  [
    {
      rank: "1st",
      label: "Winner",
      tone: "gold",
      icon: (
        // Trophy cup
        <>
          <path d="M8 3h8l1.5 6.5H6.5L8 3z" />
          <path d="M6.5 9.5a5.5 5.5 0 0 0 11 0" />
          <path d="M4 3.5h3.5M16.5 3.5H20M4 3.5v3.5a2.5 2.5 0 0 0 2.5 2.5M20 3.5v3.5a2.5 2.5 0 0 1-2.5 2.5" />
          <path d="M12 15v3.5M9 21h6M10.5 18.5h3" />
        </>
      ),
    },
    {
      rank: "2nd",
      label: "Runner-up",
      tone: "silver",
      icon: (
        // Medal
        <>
          <circle cx="12" cy="9" r="6" />
          <path d="m8.21 14.37-1.94 6.37L12 18.5l5.73 2.24-1.94-6.37" />
          <path d="m10 9 1.5 1.5L14 8" />
        </>
      ),
    },
    {
      rank: "3rd",
      label: "Second runner-up",
      tone: "bronze",
      icon: (
        // Ribbon / rosette
        <>
          <circle cx="12" cy="8" r="5" />
          <path d="M12 13v8M8.5 17.5 12 21l3.5-3.5M9 13.5 6 21M15 13.5 18 21" />
          <path d="m10.5 8 1 1 2-2" />
        </>
      ),
    },
  ];

export function Prizes() {
  return (
    <section id="prizes" className={styles.section} aria-labelledby="prizes-title">
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div className={styles.headerLede}>
            <SectionHeader
              id="prizes-title"
              eyebrow="What's at stake"
              title="Prizes worth competing for."
              lede="Exciting prizes are being confirmed and will be announced close to the event. The top three teams walk away with more than recognition."
            />
          </div>
          <div className={styles.headerArt} aria-hidden="true">
            <PrizesIllustration />
          </div>
        </div>

        <ul className={styles.tiers} aria-label="Prize tiers">
          {TIERS.map((tier, i) => (
            <li
              key={tier.rank}
              className={styles.tier}
              data-tone={tier.tone}
              data-reveal="scale"
              style={stagger(i)}
            >
              <div className={styles.tierIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {tier.icon}
                </svg>
              </div>
              <p className={styles.tierRank}>{tier.rank} place</p>
              <p className={styles.tierLabel}>{tier.label}</p>
              <div className={styles.veil} aria-label="Prize to be announced">
                <span className={styles.veilShimmer} aria-hidden="true" />
                <span className={styles.veilText}>To be revealed</span>
              </div>
            </li>
          ))}
        </ul>

        <p className={styles.hint} data-reveal>
          Winners recognised at the closing ceremony on 15 November.{" "}
          <strong className={styles.hintAccent}>Prizes to be revealed soon.</strong>
        </p>
      </div>
    </section>
  );
}

/**
 * Decorative illustration for the Prizes header. Three stacked gift boxes with
 * floating sparkles and a trophy silhouette on top. Pure SVG, animated via CSS.
 */
function PrizesIllustration() {
  return (
    <svg viewBox="0 0 320 280" className={styles.art} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="prize-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prize-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prize-teal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="160" cy="252" rx="110" ry="10" fill="rgb(10 23 53 / 0.08)" />

      {/* Big gift box — bottom */}
      <g className={styles.artBox} data-box="a">
        <rect x="48" y="168" width="224" height="76" rx="10" fill="url(#prize-blue)" />
        <rect x="48" y="168" width="224" height="76" rx="10" fill="url(#prize-blue)" opacity="0.4" />
        <rect x="152" y="168" width="16" height="76" fill="#eef2ff" opacity="0.9" />
        <rect x="48" y="192" width="224" height="8" fill="#eef2ff" opacity="0.9" />
        <path d="M160 172 Q130 150 118 160 Q106 172 134 172 Z" fill="#fde68a" opacity="0.95" />
        <path d="M160 172 Q190 150 202 160 Q214 172 186 172 Z" fill="#fde68a" opacity="0.95" />
        <circle cx="160" cy="172" r="6" fill="#f59e0b" />
      </g>

      {/* Medium gift box — middle */}
      <g className={styles.artBox} data-box="b">
        <rect x="76" y="110" width="160" height="60" rx="8" fill="url(#prize-teal)" />
        <rect x="146" y="110" width="12" height="60" fill="#ccfbf1" opacity="0.9" />
        <rect x="76" y="128" width="160" height="7" fill="#ccfbf1" opacity="0.9" />
        <path d="M152 112 Q130 94 122 104 Q114 112 134 112 Z" fill="#fecdd3" opacity="0.95" />
        <path d="M152 112 Q174 94 182 104 Q190 112 170 112 Z" fill="#fecdd3" opacity="0.95" />
        <circle cx="152" cy="112" r="5" fill="#e11d48" />
      </g>

      {/* Trophy — top */}
      <g className={styles.artTrophy}>
        <path d="M130 66 h60 l-4 32 a26 26 0 0 1 -52 0 Z" fill="url(#prize-gold)" />
        <path d="M130 66 h60 l-2 10 h-56 Z" fill="#fff7ed" opacity="0.6" />
        <path d="M126 70 q-14 2 -14 16 q0 10 14 14" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M194 70 q14 2 14 16 q0 10 -14 14" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="152" y="110" width="16" height="12" fill="#b45309" />
        <path d="M138 122 h44 v6 h-44 z" fill="#92400e" />
        <text x="160" y="92" textAnchor="middle" fontFamily="serif" fontSize="22" fontWeight="800" fill="#78350f">★</text>
      </g>

      {/* Floating sparkles */}
      <g className={styles.artSparkles}>
        <path d="M60 60 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" fill="#fcd34d" data-sparkle="a" />
        <path d="M260 40 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#60a5fa" data-sparkle="b" />
        <path d="M276 150 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#5eead4" data-sparkle="c" />
        <circle cx="36" cy="140" r="4" fill="#f472b6" data-sparkle="d" />
        <circle cx="286" cy="90" r="3" fill="#a78bfa" data-sparkle="e" />
      </g>
    </svg>
  );
}
