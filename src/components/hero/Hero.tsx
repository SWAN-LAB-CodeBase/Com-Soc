import Image from "next/image";
import { event } from "@/content/event";
import { photos } from "@/content/media";
import { formatDateRange, formatWeekdayRange } from "@/lib/format";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroMedia } from "./HeroMedia";
import { HeroNetwork } from "./HeroNetwork";
import styles from "./Hero.module.css";

export function Hero() {
  const { identity, dates, venue, ideathon } = event;

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.media}>
        <div className={styles.scrollLayer}>
          <HeroMedia>
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 64em) 66vw, 100vw"
              className={styles.photo}
            />
            <HeroNetwork />
          </HeroMedia>
        </div>
        <div className={styles.wash} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} aria-hidden="true">
            {identity.name}
          </p>
          <h1 id="hero-title" className={styles.title}>
            <span className="visually-hidden">{identity.name}: </span>
            <span className={styles.line}>Connect the</span>{" "}
            <span className={`${styles.line} ${styles.accent}`}>last&nbsp;mile.</span>
          </h1>
          <p className={styles.lede}>{identity.description}</p>
          <p className={styles.audience}>
            For teams with a rural networking idea, and for anyone who wants to learn from the
            lectures and tutorials.
          </p>
          <div className={styles.ctas}>
            <ButtonLink href="#apply" size="large" className={styles.primary}>
              Apply for the ideathon
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </ButtonLink>
            <ButtonLink href="#attend" size="large" variant="secondary">
              Register to attend
            </ButtonLink>
          </div>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt>Theme</dt>
            <dd>{identity.theme}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>
              {dates.status === "confirmed" ? (
                <>
                  {formatDateRange(dates.value)}
                  <span className={styles.factNote}>{formatWeekdayRange(dates.value)}</span>
                </>
              ) : (
                "Dates to be announced"
              )}
            </dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>
              {venue.status === "confirmed" ? venue.value.name : "Venue to be announced"}
              {venue.status === "confirmed" && (
                <span className={styles.factNote}>{venue.value.city}</span>
              )}
            </dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>
              Ideathon, lectures and tutorials
              <span className={styles.factNote}>
                {ideathon.shortlistedTeams} shortlisted teams of up to {ideathon.maxTeamSize}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
