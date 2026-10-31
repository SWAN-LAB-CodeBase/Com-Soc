import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/lib/stagger";
import styles from "./AboutUs.module.css";

const SUPPORTERS = [
  { key: "ieee-comsoc", label: "IEEE ComSoc", tone: "indigo" },
  { key: "nptel", label: "NPTEL", tone: "teal" },
  { key: "ieee-kgp-cssbc", label: "IEEE Kharagpur Section CS-SBC", tone: "amber" },
  { key: "ieee-kgp-sb", label: "IEEE Kharagpur Section SB", tone: "indigo" },
] as const;

export function AboutUs() {
  return (
    <section id="about-us" className={styles.section} aria-labelledby="about-us-title">
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.ambientOrb} data-tone="indigo" />
        <span className={styles.ambientOrb} data-tone="teal" />
      </div>

      <div className={styles.inner}>
        <SectionHeader
          id="about-us-title"
          eyebrow="About the event"
          title={
            <>
              <span className={styles.titleAccent}>RuralConnect</span> will be held at{" "}
              <span className={styles.titleAccent}>IIT Kharagpur</span>, supported by a coalition of
              national bodies championing rural connectivity.
            </>
          }
          lede="A two-day National Workshop convening students, researchers and industry around the networks that reach India's villages."
        />

        <ul className={styles.supporters} aria-label="Supporting organisations">
          {SUPPORTERS.map((s, i) => (
            <li
              key={s.key}
              className={styles.supporter}
              data-tone={s.tone}
              data-reveal="scale"
              style={stagger(i)}
            >
              <span className={styles.supporterMark} aria-hidden="true" />
              <span className={styles.supporterLabel}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
