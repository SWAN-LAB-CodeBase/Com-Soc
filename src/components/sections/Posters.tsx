import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Posters.module.css";
import { stagger } from "@/lib/stagger";

const POSTERS = [
  {
    key: "a",
    label: "Event poster",
    src: "/images/poster-2.jpg",
    alt: "RuralConnect 2026 event poster",
  },
] as const;

export function Posters() {
  return (
    <section id="posters" className={styles.section} aria-labelledby="posters-title">
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.ambientOrb} data-tone="indigo" />
        <span className={styles.ambientOrb} data-tone="teal" />
      </div>
      <div className={styles.inner}>
        <SectionHeader
          id="posters-title"
          eyebrow="Event poster"
          title="Share RuralConnect 2026."
          lede="Pass this on to your lab, your department, your college. Click the poster to view it full-size."
        />

        <ul className={styles.grid} aria-label="Event posters">
          {POSTERS.map((p, i) => (
            <li
              key={p.key}
              className={styles.card}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              style={stagger(i)}
            >
              <a
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.frame}
                aria-label={`${p.label} (opens full-size in a new tab)`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={796}
                  height={1200}
                  sizes="(min-width: 48em) 32rem, 90vw"
                  className={styles.image}
                />
                <span className={styles.frameLabel}>{p.label}</span>
                <span className={styles.frameHint} aria-hidden="true">
                  Open full-size →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
