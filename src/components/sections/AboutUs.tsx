import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { stagger } from "@/lib/stagger";
import styles from "./AboutUs.module.css";

const PILLARS = [
  {
    key: "wireless",
    title: "Wireless networks",
    body: "Protocols, mesh, LPWAN and emerging radio systems that reach where fibre cannot.",
    tone: "indigo",
  },
  {
    key: "iot",
    title: "IoT & smart sensing",
    body: "Low-power sensing, edge intelligence and the data pipelines that make villages legible to a network.",
    tone: "teal",
  },
  {
    key: "ai",
    title: "AI for networking",
    body: "Machine learning in the stack — intelligent routing, spectrum sharing and anomaly detection.",
    tone: "amber",
  },
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
          eyebrow="About us"
          title={
            <>
              RuralConnect is organised by{" "}
              <span className={styles.titleAccent}>SWAN Lab, IIT Kharagpur</span>.
            </>
          }
          lede="The Smart Wireless Applications and Networking (SWAN) Lab at IIT Kharagpur builds the networks, protocols and intelligent systems that keep the next billion people online — and rural communities at the centre of its work."
        />

        <div className={styles.body}>
          <ul className={styles.pillars} aria-label="Research focus">
            {PILLARS.map((p, i) => (
              <li
                key={p.key}
                className={styles.pillar}
                data-tone={p.tone}
                data-reveal="scale"
                style={stagger(i)}
              >
                <span className={styles.pillarMark} aria-hidden="true" />
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </li>
            ))}
          </ul>

          <div className={styles.callout} data-reveal>
            <p className={styles.calloutTitle}>Learn more about the lab.</p>
            <p className={styles.calloutBody}>
              Browse our ongoing research, past projects and student life at{" "}
              <strong>swanlab.in</strong>.
            </p>
            <div className={styles.calloutActions}>
              <ButtonLink
                href="https://swanlab.in"
                external
                size="large"
                className={styles.cta}
              >
                Visit swanlab.in
                <span aria-hidden="true"> →</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
