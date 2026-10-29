import type React from "react";
import { event } from "@/content/event";
import { siteConfig } from "@/lib/site-config";
import { stagger } from "@/lib/stagger";
import { TrackGlyph } from "./TrackGlyph";
import styles from "./ChallengeTopics.module.css";

type Palette = {
  bg: string;
  accent: string;
  text: string;
  glow: string;
  orbA: string;
  orbB: string;
  ring: string;
};

const TRACK_COLORS: Record<string, Palette> = {
  "rural-comm": {
    bg: "linear-gradient(135deg, #4f46e5 0%, #6366f1 55%, #8b5cf6 100%)",
    accent: "#c7d2fe",
    text: "#ffffff",
    glow: "rgb(99 102 241 / 0.55)",
    orbA: "rgb(167 139 250 / 0.75)",
    orbB: "rgb(79 70 229 / 0.75)",
    ring: "rgb(199 210 254 / 0.35)",
  },
  "ai-ml": {
    bg: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 55%, #06b6d4 100%)",
    accent: "#bae6fd",
    text: "#ffffff",
    glow: "rgb(14 165 233 / 0.55)",
    orbA: "rgb(34 211 238 / 0.75)",
    orbB: "rgb(3 105 161 / 0.75)",
    ring: "rgb(186 230 253 / 0.35)",
  },
};

const FALLBACK: Palette = {
  bg: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
  accent: "#e5e7eb",
  text: "#ffffff",
  glow: "rgb(107 114 128 / 0.5)",
  orbA: "rgb(156 163 175 / 0.6)",
  orbB: "rgb(55 65 81 / 0.6)",
  ring: "rgb(229 231 235 / 0.35)",
};

export function ChallengeTopics() {
  const { tracks } = event;
  const applyUrl = siteConfig.ideathonFormUrl;
  const applyHref = applyUrl ?? "#apply";
  const external = Boolean(applyUrl);

  return (
    <section className={styles.section} aria-labelledby="topics-heading">
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.ambientOrb} data-ambient="a" />
        <span className={styles.ambientOrb} data-ambient="b" />
      </div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow} data-reveal="scale">
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Challenge topics
          </p>
          <h2 id="topics-heading" className={styles.heading} data-reveal>
            Pick your arena and compete
          </h2>
          <p className={styles.sub} data-reveal style={stagger(1)}>
            Two frontiers. One mission — rewrite how rural India connects.
          </p>
        </div>

        <ol className={styles.cards}>
          {tracks.map((track, index) => {
            const colors = TRACK_COLORS[track.id] ?? FALLBACK;
            const cardStyle = {
              "--card-bg": colors.bg,
              "--card-accent": colors.accent,
              "--card-text": colors.text,
              "--card-glow": colors.glow,
              "--card-orb-a": colors.orbA,
              "--card-orb-b": colors.orbB,
              "--card-ring": colors.ring,
            } as React.CSSProperties;
            return (
              <li
                key={track.id}
                className={styles.card}
                style={cardStyle}
                data-reveal={index % 2 === 0 ? "left" : "right"}
              >
                <span className={styles.cardShine} aria-hidden="true" />
                <span className={styles.cardOrbs} aria-hidden="true">
                  <span className={styles.orb} data-orb="a" />
                  <span className={styles.orb} data-orb="b" />
                  <span className={styles.orb} data-orb="c" />
                </span>
                <span className={styles.gridLines} aria-hidden="true" />

                <div className={styles.cardHead}>
                  <span className={styles.number} aria-hidden="true">
                    {track.number}
                  </span>
                  <span className={styles.glyphBadge} aria-hidden="true">
                    <span className={styles.glyphRing} />
                    <span className={styles.glyphInner}>
                      <TrackGlyph glyph={track.glyph} />
                    </span>
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.title}>{track.title}</h3>
                  <p className={styles.summary}>{track.summary}</p>
                  <ul className={styles.tags} aria-label="Focus areas">
                    {track.focus.map((f, i) => (
                      <li
                        key={f}
                        className={styles.tag}
                        data-reveal="scale"
                        style={stagger(i + 1)}
                      >
                        <span className={styles.tagDot} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={applyHref}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={styles.cta}
                >
                  <span className={styles.ctaLabel}>Enter this track</span>
                  <span className={styles.ctaArrow} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
