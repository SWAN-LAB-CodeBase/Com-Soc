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
        <SectionHeader
          id="prizes-title"
          eyebrow="What's at stake"
          title="Prizes worth competing for."
          lede="Exciting prizes are being confirmed and will be announced close to the event. The top three teams walk away with more than recognition."
        />

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
          <strong className={styles.hintAccent}>Prize announcement coming soon.</strong>
        </p>
      </div>
    </section>
  );
}
