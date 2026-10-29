import type React from "react";
import { event } from "@/content/event";
import { siteConfig } from "@/lib/site-config";
import styles from "./ChallengeTopics.module.css";

const TRACK_COLORS: Record<string, { bg: string; accent: string; text: string }> = {
  "rural-comm": {
    bg: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    accent: "#c7d2fe",
    text: "#ffffff",
  },
  "ai-ml": {
    bg: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    accent: "#bae6fd",
    text: "#ffffff",
  },
};

const FALLBACK = { bg: "linear-gradient(135deg, #374151 0%, #6b7280 100%)", accent: "#e5e7eb", text: "#ffffff" };

export function ChallengeTopics() {
  const { tracks } = event;
  const applyUrl = siteConfig.ideathonFormUrl;
  const applyHref = applyUrl ?? "#apply";
  const external = Boolean(applyUrl);

  return (
    <section className={styles.section} aria-labelledby="topics-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Challenge topics</p>
          <h2 id="topics-heading" className={styles.heading}>
            Pick your arena and compete
          </h2>
        </div>

        <ol className={styles.cards}>
          {tracks.map((track) => {
            const colors = TRACK_COLORS[track.id] ?? FALLBACK;
            return (
              <li
                key={track.id}
                className={styles.card}
                style={{ background: colors.bg } as React.CSSProperties}
              >
                <span className={styles.number} style={{ color: colors.accent }}>
                  {track.number}
                </span>
                <h3 className={styles.title} style={{ color: colors.text }}>
                  {track.title}
                </h3>
                <p className={styles.summary} style={{ color: colors.accent }}>
                  {track.summary}
                </p>
                <ul className={styles.tags} aria-label="Focus areas">
                  {track.focus.map((f) => (
                    <li key={f} className={styles.tag} style={{ borderColor: colors.accent, color: colors.accent }}>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={applyHref}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={styles.cta}
                  style={{ color: colors.text, borderColor: colors.accent }}
                >
                  Enter this track <span aria-hidden="true">→</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
