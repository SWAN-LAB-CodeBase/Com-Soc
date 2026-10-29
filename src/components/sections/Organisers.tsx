import { event } from "@/content/event";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Organisers.module.css";
import { stagger } from "@/lib/stagger";

const SPEAKER_DOMAINS = [
  "Industry leader",
  "Government expert",
  "AI innovator",
  "Rural pioneer",
] as const;

export function Organisers() {
  const speakers = event.speakers.filter((s) => s.publication === "confirmed");

  return (
    <section id="organisers" className={styles.section} aria-labelledby="organisers-title">
      <div className={styles.inner}>
        <SectionHeader id="organisers-title" eyebrow="People" title="Organisers and speakers." />

        <ul className={styles.people} aria-label="Organisers">
          {event.organizers.map((person, i) => (
            <li key={person.name} className={styles.person} data-reveal="scale" style={stagger(i)}>
              <span
                className={styles.monogram}
                aria-hidden="true"
                data-reveal="spin"
                style={stagger(i + 1)}
              >
                {initials(person.name)}
              </span>
              <p className={styles.role}>{person.role}</p>
              <p className={styles.name}>{person.name}</p>
              {person.affiliation.status === "confirmed" && (
                <p className={styles.affiliation}>{person.affiliation.value}</p>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.speakers} data-reveal>
          <h3 className={styles.speakersTitle}>
            Invited speakers
            {speakers.length === 0 && (
              <span className={styles.speakersBadge} aria-label="Lineup being confirmed">
                Coming soon
              </span>
            )}
          </h3>
          {speakers.length > 0 ? (
            <ul className={styles.speakerList}>
              {speakers.map((s) => (
                <li key={s.name}>
                  <p className={styles.name}>{s.name}</p>
                  <p className={styles.role}>{s.role}</p>
                  {s.affiliation.status === "confirmed" && (
                    <p className={styles.affiliation}>{s.affiliation.value}</p>
                  )}
                  {s.talkTitle && <p className={styles.talk}>{s.talkTitle}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.speakerTeaser}>
              <p className={styles.teaserSignal}>
                <span className={styles.teaserDot} aria-hidden="true" />
                Lineup being confirmed — watch this space
              </p>
              <ul className={styles.ghostCards} aria-hidden="true">
                {SPEAKER_DOMAINS.map((domain) => (
                  <li key={domain} className={styles.ghostCard}>
                    <span className={styles.ghostAvatar}>
                      <span className={styles.ghostAvatarShimmer} />
                    </span>
                    <span className={styles.ghostDomain}>{domain}</span>
                    <span className={styles.ghostBar}>
                      <span className={styles.ghostBarShimmer} />
                    </span>
                    <span className={styles.ghostBarShort}>
                      <span className={styles.ghostBarShimmer} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className={styles.tba}>
                Industry and government lectures, and tutorials on rural wireless, LPWAN and
                AI-enabled networks, are being confirmed. Names appear here once each speaker has
                accepted.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function initials(name: string): string {
  return name
    .replace(/^(Prof|Dr|Mr|Ms|Mrs)\.?\s+/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
