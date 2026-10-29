import type { ReactNode } from "react";
import Image from "next/image";
import { event } from "@/content/event";
import { photos } from "@/content/media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/media/CountUp";
import { TiltSurface } from "@/components/media/TiltSurface";
import styles from "./Overview.module.css";
import { stagger } from "@/lib/stagger";

const PRINCIPLES = [
  {
    term: "Affordable",
    detail: "Solutions a rural community can pay for and keep running.",
    icon: "affordable",
  },
  {
    term: "Resilient",
    detail: "Links that survive outages, distance and harsh conditions.",
    icon: "resilient",
  },
  {
    term: "Inclusive",
    detail: "Connectivity that serves farms, clinics and classrooms alike.",
    icon: "inclusive",
  },
  {
    term: "Practical to deploy",
    detail: "Ideas grounded in real constraints of power, terrain and cost.",
    icon: "practical",
  },
] as const;

/** Small line icons for the four principles (decorative). */
const PRINCIPLE_ICONS: Record<(typeof PRINCIPLES)[number]["icon"], ReactNode> = {
  // A coin with a rupee-style stroke: low cost to build and run.
  affordable: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 8.5h6M9 11.5h6M11 8.5c2.5 0 2.5 3 0 3H9.5l4.5 4.5" />
    </>
  ),
  // A shield: links that hold up.
  resilient: (
    <>
      <path d="M12 3.5 5 6.5v5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9v-5z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  // Three people: served alike.
  inclusive: (
    <>
      <circle cx="12" cy="8" r="2.6" />
      <circle cx="5.8" cy="10" r="2" />
      <circle cx="18.2" cy="10" r="2" />
      <path d="M7.5 19c.6-3 2.3-4.6 4.5-4.6s3.9 1.6 4.5 4.6M2.8 17.5c.4-2 1.5-3.1 3-3.1M21.2 17.5c-.4-2-1.5-3.1-3-3.1" />
    </>
  ),
  // A wrench: built for real conditions.
  practical: (
    <path d="M14.7 6.3a4 4 0 0 0-5.3 5.3L4 17l3 3 5.4-5.4a4 4 0 0 0 5.3-5.3l-2.6 2.6-2.4-.6-.6-2.4z" />
  ),
};

export function Overview() {
  const { ideathon, tracks } = event;

  const figures = [
    { value: 2, label: "days of talks, tutorials and building" },
    { value: tracks.length, label: "challenge tracks" },
    { value: ideathon.shortlistedTeams, label: "teams shortlisted for the ideathon" },
    { value: ideathon.maxTeamSize, label: "people per team, at most" },
  ];

  return (
    <section id="overview" className={styles.section} aria-labelledby="overview-title">
      <div className={styles.inner}>
        <div className={styles.lead}>
          <SectionHeader
            id="overview-title"
            eyebrow="Why RuralConnect"
            title="Reliable connectivity comes before digital inclusion."
            lede="Affordable, reliable communication is a prerequisite for inclusive digital services. RuralConnect asks one question: how can we make rural communication and connectivity more affordable, resilient, inclusive and practical to deploy?"
          />

          <dl className={styles.principles}>
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.term}
                className={styles.principle}
                data-tone={i % 2 === 0 ? "blue" : "teal"}
                data-reveal="left"
                style={stagger(i)}
              >
                <dt>
                  <span className={styles.icon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {PRINCIPLE_ICONS[p.icon]}
                    </svg>
                  </span>
                  {p.term}
                </dt>
                <dd>{p.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className={styles.figures} aria-label="Event at a glance">
          {figures.map((f, i) => (
            <li key={f.label} data-reveal="scale" style={stagger(i)}>
              <CountUp value={f.value} className={styles.figure} />
              <span className={styles.figureLabel}>{f.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.audiences}>
          <TiltSurface className={styles.tilt} maxTilt={3}>
            <article className={styles.audience} data-variant="blue" data-reveal="flip">
              <div className={styles.cardPhoto}>
                <Image
                  src={photos.cardTeams.src}
                  alt={photos.cardTeams.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 48em) 34vw, 90vw"
                />
              </div>
              <div className={styles.panel}>
                <h3>Ideathon teams</h3>
                <p>
                  Teams of one or two with an idea where communications or networking is the
                  technical core. Shortlisted teams develop it with mentors and pitch it to a
                  technical jury.
                </p>
                <a href="#ideathon" className={styles.more}>
                  How the ideathon works
                </a>
              </div>
            </article>
          </TiltSurface>
          <TiltSurface className={styles.tilt} maxTilt={3}>
            <article
              className={styles.audience}
              data-variant="teal"
              data-reveal="flip"
              style={stagger(1)}
            >
              <div className={styles.cardPhoto}>
                <Image
                  src={photos.cardAttendees.src}
                  alt={photos.cardAttendees.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 48em) 34vw, 90vw"
                />
              </div>
              <div className={styles.panel}>
                <h3>Lectures &amp; tutorials</h3>
                <p>
                  Two days of invited talks and hands-on sessions that run alongside the
                  ideathon — a chance to learn from the field and sharpen the ideas you pitch.
                </p>
                <a href="#programme" className={styles.more}>
                  See the programme
                </a>
              </div>
            </article>
          </TiltSurface>
        </div>
      </div>
    </section>
  );
}
