import Image from "next/image";
import { event } from "@/content/event";
import { photos } from "@/content/media";
import { formatDateRange, formatWeekdayRange } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CountdownTimer } from "@/components/media/CountdownTimer";
import { HeroMedia } from "./HeroMedia";
import { HeroNetwork } from "./HeroNetwork";
import { HeroThemes } from "./HeroThemes";
import styles from "./Hero.module.css";

export function Hero() {
  const { identity, dates, venue, ideathon, tracks } = event;
  const applyUrl = siteConfig.ideathonFormUrl;
  const attendUrl = siteConfig.attendeeFormUrl;

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.aurora} aria-hidden="true" />
      <HeroThemes />
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
          <div className={styles.buzz} role="status" aria-label="Competition is open">
            <span className={styles.liveSignal} aria-hidden="true" />
            Competition open&ensp;·&ensp;14–15&nbsp;November &nbsp;2026
          </div>
          <p className={styles.eyebrow} aria-hidden="true">
            {identity.name}
          </p>
          <h1 id="hero-title" className={styles.title}>
            <span className="visually-hidden">{identity.name}: </span>
            <span className={styles.line}>National Workshop on Rural Communication Innovations</span>{" "}
            <span className={`${styles.line} ${styles.accent}`}>Empowering Underpriviledged Youth</span>
          </h1>
          <p className={styles.lede}>{identity.description}</p>
          <p className={styles.audience}>
            For UnderGraduate, PostGraduate and PhD — innovate, pitch and compete across{" "}
            {tracks.length} challenge tracks.
          </p>
          <div className={styles.ctas}>
            <ButtonLink
              href={applyUrl ?? "#apply"}
              external={Boolean(applyUrl)}
              size="large"
              className={styles.primary}
            >
              Apply for the ideathon
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </ButtonLink>
            <ButtonLink
              href={attendUrl ?? "#attend"}
              external={Boolean(attendUrl)}
              size="large"
              variant="secondary"
            >
              Register to attend
            </ButtonLink>
          </div>
          <p className={styles.freeNotice} role="note">
            <span className={styles.freeBadge} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.5l4 4L19 7" />
              </svg>
              Free
            </span>
            <span className={styles.freeText}>
              Registration is <strong>completely free</strong> for applicants and attendees — no fee,
              ever.
            </span>
          </p>
          {/* What's in the competition — advertised right on the hero */}
          <div className={styles.competitionStrip} aria-label="Competition highlights">
            <div className={styles.stripItem}>
              <span className={styles.stripIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3h8l1.5 6.5H6.5L8 3z" />
                  <path d="M6.5 9.5a5.5 5.5 0 0 0 11 0" />
                  <path d="M12 15v3.5M9 21h6" />
                </svg>
              </span>
              <span className={styles.stripValue}>Prizes</span>
              <span className={styles.stripDetail}>to be revealed</span>
            </div>
            <span className={styles.stripDivider} aria-hidden="true" />
            <div className={styles.stripItem}>
              <span className={styles.stripIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                  <path d="M7 6v12M17 6v12" />
                </svg>
              </span>
              <span className={styles.stripValue}>{tracks.length} tracks</span>
              <span className={styles.stripDetail}>choose your arena</span>
            </div>
            <span className={styles.stripDivider} aria-hidden="true" />
            <div className={styles.stripItem}>
              <span className={styles.stripIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
              <span className={styles.stripValue}>Top speakers</span>
              <span className={styles.stripDetail}>industry &amp; government</span>
            </div>
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

        {dates.status === "confirmed" && (
          <CountdownTimer
            targetDate="2026-11-03T23:59:00+05:30"
            className={styles.timerRow}
          />
        )}
      </div>
    </section>
  );
}
