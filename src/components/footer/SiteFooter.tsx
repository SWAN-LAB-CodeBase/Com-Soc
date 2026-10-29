import { event } from "@/content/event";
import { formatDateRange } from "@/lib/format";
import { resolveRegistration } from "@/lib/registration";
import { siteConfig } from "@/lib/site-config";
import { BrandMark } from "@/components/brand/BrandMark";
import { Wordmark } from "@/components/brand/Wordmark";
import type { NavItem } from "@/content/types";
import styles from "./SiteFooter.module.css";
import { stagger } from "@/lib/stagger";

export function SiteFooter({ nav }: { nav: readonly NavItem[] }) {
  const { identity, dates, venue, organizers, registration, social } = event;
  const email = siteConfig.contactEmail;
  const year = dates.status === "confirmed" ? dates.value.start.slice(0, 4) : "2026";

  const registrationLinks = [
    {
      label: "Ideathon application",
      href: "#apply",
      state: resolveRegistration(registration.ideathon, siteConfig),
    },
    {
      label: "Attendee registration",
      href: "#attend",
      state: resolveRegistration(registration.attendee, siteConfig),
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity} data-reveal>
          <p className={styles.brand}>
            <BrandMark size={32} />
            <Wordmark size="large" />
          </p>
          <p className={styles.theme}>{identity.theme}</p>
          <p className={styles.when}>
            {dates.status === "confirmed" ? formatDateRange(dates.value) : "Dates to be announced"}
            {" · "}
            {venue.status === "confirmed"
              ? `${venue.value.name}, ${venue.value.city}`
              : "Venue to be announced"}
          </p>
        </div>

        <nav aria-label="Footer" className={styles.col} data-reveal style={stagger(1)}>
          <h2 className={styles.colTitle}>Explore</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col} data-reveal style={stagger(2)}>
          <h2 className={styles.colTitle}>Register</h2>
          <ul>
            {registrationLinks.map((link) => (
              <li key={link.href}>
                {link.state.status === "open" ? (
                  <a href={link.state.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a href={link.href}>
                    {link.label}
                    <span className={styles.muted}>
                      {link.state.status === "closed" ? " · closed" : " · opening soon"}
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col} data-reveal style={stagger(3)}>
          <h2 className={styles.colTitle}>Organisers</h2>
          <ul>
            {organizers.map((p) => (
              <li key={p.name}>
                {p.name}
                <span className={styles.muted}> · {p.role}</span>
              </li>
            ))}
          </ul>
          {email && (
            <p className={styles.contact}>
              <a href={`mailto:${email}`} className={styles.contactEmail}>
                <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
                  <path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z" />
                  <path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z" />
                </svg>
                {email}
              </a>
            </p>
          )}
          {social.length > 0 && (
            <ul className={styles.social}>
              {social.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.legal}>
        <p>© {year} RuralConnect 2026 Organising Team</p>
      </div>
    </footer>
  );
}
