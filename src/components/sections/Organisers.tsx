import { event } from "@/content/event";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Organisers.module.css";
import { stagger } from "@/lib/stagger";

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
          <h3 className={styles.speakersTitle}>Invited speakers</h3>
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
            <p className={styles.tba}>
              Lectures from industry and government speakers, and tutorials on rural wireless, LPWAN
              and AI-enabled networks, are being confirmed. Names will appear here once each speaker
              has accepted.
            </p>
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
