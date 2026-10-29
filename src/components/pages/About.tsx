import Image from "next/image";
import { event } from "@/content/event";
import { photos } from "@/content/media";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { stagger } from "@/lib/stagger";
import styles from "./About.module.css";

const PILLARS = [
  {
    key: "rural-first",
    eyebrow: "Mission",
    title: "Rural, first.",
    body: "Every idea here is anchored in India's villages — the people, the terrain, the networks that still need to be built.",
    tone: "indigo",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 36h32M12 36V22l12-10 12 10v14" />
        <path d="M20 36v-8h8v8" />
        <path d="M30 14v-4M42 20l-2 2M8 20l-2-2" opacity="0.6" />
      </svg>
    ),
  },
  {
    key: "tech-depth",
    eyebrow: "Craft",
    title: "Technical depth.",
    body: "Wireless, mesh, LPWAN, AI-driven routing — real engineering, not surface-level demos. We judge the networking, not the slides.",
    tone: "teal",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <circle cx="8" cy="12" r="3" />
        <circle cx="40" cy="12" r="3" />
        <circle cx="8" cy="36" r="3" />
        <circle cx="40" cy="36" r="3" />
        <path d="M11 14l10 8M37 14 27 22M11 34l10-8M37 34 27 26" opacity="0.55" />
      </svg>
    ),
  },
  {
    key: "voices",
    eyebrow: "Community",
    title: "Many voices.",
    body: "Undergraduates, postgraduates, PhD scholars, industry, government — one weekend, one shared table, one shared problem.",
    tone: "amber",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="6" />
        <circle cx="34" cy="22" r="5" />
        <circle cx="26" cy="34" r="5" />
        <path d="M18 24c-6 0-10 4-10 10M34 27c5 0 8 3 8 8M26 39c0 3-2 5-5 5s-5-2-5-5" opacity="0.55" />
      </svg>
    ),
  },
  {
    key: "action",
    eyebrow: "Outcome",
    title: "From idea to action.",
    body: "The best teams don't go home with a trophy — they go home with mentors, next steps, and a path from pitch to pilot.",
    tone: "rose",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6l5 10 11 1-8 8 2 11-10-5-10 5 2-11-8-8 11-1 5-10z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "2", label: "days of ideathon", suffix: "" },
  { value: "20", label: "shortlisted teams" },
  { value: "2", label: "challenge tracks" },
  { value: "0", label: "fee for everyone", suffix: "₹" },
];

const TIMELINE = [
  {
    phase: "Spark",
    title: "An idea becomes a submission",
    body: "A 300–500 word abstract, your networking architecture, and the track you want to compete in. That's it — no fees, no gatekeeping.",
    tone: "indigo",
  },
  {
    phase: "Shortlist",
    title: "Twenty teams are selected",
    body: "Reviewers from industry and academia pick the ideas that answer a real rural problem with real network innovation.",
    tone: "sky",
  },
  {
    phase: "Showdown",
    title: "Two days in Kharagpur",
    body: "Lectures, tutorials, and a live pitching stage. You present for five minutes, answer for two, and defend your network choices.",
    tone: "teal",
  },
  {
    phase: "Spark again",
    title: "The pilot path begins",
    body: "The strongest ideas leave with mentorship, next steps and a route from a judged pitch toward a pilot deployment.",
    tone: "amber",
  },
];

export function About() {
  const applyUrl = siteConfig.ideathonFormUrl;
  const applyHref = applyUrl ?? "/#apply";
  const external = Boolean(applyUrl);
  const { identity } = event;

  return (
    <article className={styles.page}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroAmbient} aria-hidden="true">
          <span className={styles.ambientOrb} data-tone="indigo" />
          <span className={styles.ambientOrb} data-tone="teal" />
          <span className={styles.ambientOrb} data-tone="amber" />
          <span className={styles.ambientGrid} />
        </div>

        <div className={styles.heroInner}>
          <p className={styles.badge} data-reveal="scale">
            <span className={styles.badgeDot} aria-hidden="true" />
            About RuralConnect
          </p>
          <h1 id="about-title" className={styles.title} data-reveal>
            <span className={styles.titleLine}>Networks that</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>reach every village.</span>
          </h1>
          <p className={styles.lede} data-reveal style={stagger(1)}>
            {identity.name} is a national workshop and ideathon on {identity.theme.toLowerCase()}.
            We bring students, scholars and builders together to invent the connectivity rural
            India still needs — and to turn ideas into pilots.
          </p>

          <div className={styles.heroActions} data-reveal style={stagger(2)}>
            <ButtonLink
              href={applyHref}
              external={external}
              size="large"
            >
              Apply for the ideathon
              <span aria-hidden="true"> →</span>
            </ButtonLink>
            <ButtonLink href="/" variant="secondary" size="large">
              Back to event home
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className={styles.story} aria-labelledby="story-title">
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <p className={styles.sectionEyebrow} data-reveal="scale">Why we exist</p>
            <h2 id="story-title" className={styles.storyTitle} data-reveal>
              Half of India is still waiting
              <br />
              for a signal strong enough
              <br />
              to <span className={styles.underlineAccent}>change their lives.</span>
            </h2>
            <div className={styles.storyBody}>
              <p data-reveal style={stagger(1)}>
                In 2026, broadband and reliable mobile data still stop at the edge of our cities.
                Clinics lose connectivity when it rains. Classrooms share one unreliable hotspot.
                Farms work with yesterday's weather. The hardware is cheap. The software is
                available. The networks, the protocols, the deployments — those are still being
                invented. By the next generation of engineers. By you.
              </p>
              <p data-reveal style={stagger(2)}>
                RuralConnect exists so that invention happens in public, under real constraints,
                judged by real experts, with a clear line from a pitched idea to a village pilot.
              </p>
            </div>
          </div>

          <figure className={styles.storyMedia} data-reveal="scale" style={stagger(1)}>
            <span className={styles.storyMediaFrame} aria-hidden="true" />
            <Image
              src={photos.village.src}
              alt="Rural landscape with paddy fields — the communities RuralConnect works for"
              placeholder="blur"
              sizes="(min-width: 64em) 32rem, 100vw"
              className={styles.storyMediaImg}
            />
            <figcaption className={styles.storyCaption}>
              <span className={styles.storyCaptionDot} aria-hidden="true" />
              Where the signal still has to reach
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Pillars ───────────────────────────────────────── */}
      <section className={styles.pillarsSection} aria-labelledby="pillars-title">
        <div className={styles.pillarsInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow} data-reveal="scale">What we stand for</p>
            <h2 id="pillars-title" className={styles.sectionHeading} data-reveal>
              Four principles.
              <br />
              <span className={styles.inkMuted}>One shared mission.</span>
            </h2>
          </div>

          <ul className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <li
                key={p.key}
                className={styles.pillar}
                data-tone={p.tone}
                data-reveal={i % 2 === 0 ? "left" : "right"}
                style={stagger(i)}
              >
                <span className={styles.pillarNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.pillarGlow} aria-hidden="true" />
                <span className={styles.pillarShine} aria-hidden="true" />
                <span className={styles.pillarOrbs} aria-hidden="true">
                  <span className={styles.pillarOrb} data-orb="a" />
                  <span className={styles.pillarOrb} data-orb="b" />
                </span>
                <span className={styles.pillarGrid} aria-hidden="true" />

                <span className={styles.pillarIconWrap} aria-hidden="true">
                  <span className={styles.pillarIconHalo} />
                  <span className={styles.pillarIconRingOuter} />
                  <span className={styles.pillarIconRing} />
                  <span className={styles.pillarIcon}>{p.icon}</span>
                </span>

                <p className={styles.pillarEyebrow}>
                  <span className={styles.pillarEyebrowDot} aria-hidden="true" />
                  {p.eyebrow}
                </p>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>

                <span className={styles.pillarCorner} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stats band ────────────────────────────────────── */}
      <section className={styles.statsSection} aria-labelledby="stats-title">
        <h2 id="stats-title" className="visually-hidden">
          The ideathon by the numbers
        </h2>
        <div className={styles.statsInner}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.stat} data-reveal="scale" style={stagger(i)}>
              <span className={styles.statValue}>
                {s.suffix === "₹" && <em className={styles.statSuffix}>{s.suffix}</em>}
                {s.value}
                {s.suffix && s.suffix !== "₹" && <em className={styles.statSuffix}>{s.suffix}</em>}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline / Journey ────────────────────────────── */}
      <section className={styles.timelineSection} aria-labelledby="timeline-title">
        <div className={styles.timelineInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow} data-reveal="scale">The journey</p>
            <h2 id="timeline-title" className={styles.sectionHeading} data-reveal>
              From spark to pilot — in four steps.
            </h2>
          </div>

          <ol className={styles.timeline}>
            {TIMELINE.map((t, i) => (
              <li
                key={t.phase}
                className={styles.timelineItem}
                data-tone={t.tone}
                data-reveal={i % 2 === 0 ? "right" : "left"}
                style={stagger(i)}
              >
                <span className={styles.timelineRail} aria-hidden="true" />
                <span className={styles.timelineDot} aria-hidden="true">
                  <span className={styles.timelineDotCore} />
                  <span className={styles.timelineDotPulse} />
                </span>
                <div className={styles.timelineCard}>
                  <p className={styles.timelinePhase}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span>·</span>
                    <span>{t.phase}</span>
                  </p>
                  <h3 className={styles.timelineTitle}>{t.title}</h3>
                  <p className={styles.timelineBody}>{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaInner}>
          <span className={styles.ctaOrbA} aria-hidden="true" />
          <span className={styles.ctaOrbB} aria-hidden="true" />
          <p className={styles.ctaEyebrow} data-reveal="scale">Join us</p>
          <h2 id="cta-title" className={styles.ctaTitle} data-reveal>
            Build the network India is still waiting for.
          </h2>
          <p className={styles.ctaBody} data-reveal style={stagger(1)}>
            Two days. Two tracks. One pitching stage. Entirely free — for applicants and attendees.
          </p>
          <div className={styles.ctaActions} data-reveal style={stagger(2)}>
            <ButtonLink href={applyHref} external={external} size="large">
              Apply for the ideathon
              <span aria-hidden="true"> →</span>
            </ButtonLink>
            <ButtonLink href="/" variant="secondary" size="large">
              Explore the event
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
