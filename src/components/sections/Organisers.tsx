import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/lib/stagger";
import committee from "@/assets/event_organising_committees.json";
import styles from "./Organisers.module.css";

type Lead = { name: string; annotation?: string; transcription_note?: string };
type Subgroup = { name: string; lead?: Lead; members: readonly string[] };
type Committee = {
  id: number;
  name: string;
  lead?: Lead;
  members?: readonly string[];
  subgroups?: readonly Subgroup[];
};
type Affiliation = { position: string; institution: string };

export function Organisers() {
  const organizers = committee.organizers as readonly {
    name: string;
    role: string;
    photo?: string;
    affiliations?: readonly Affiliation[];
    memberships?: string;
  }[];
  const coordinators = committee.event_coordinators as readonly {
    name: string;
    photo?: string;
  }[];
  const committees = committee.team_members.committees as readonly Committee[];

  return (
    <section id="organisers" className={styles.section} aria-labelledby="organisers-title">
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.ambientOrb} data-tone="indigo" />
        <span className={styles.ambientOrb} data-tone="teal" />
      </div>

      <div className={styles.inner}>
        <SectionHeader id="organisers-title" eyebrow="People" title="Who's building this." />

        {/* ── Organizers ─────────────────────────────────── */}
        <GroupHeader
          tag="Organizers"
          title="Faculty leadership"
          lede="The faculty members shaping the technical vision and the direction of RuralConnect 2026."
          tone="indigo"
        />
        <ul className={styles.people} aria-label="Organizers">
          {organizers.map((person, i) => (
            <li
              key={person.name}
              className={styles.person}
              data-tone="indigo"
              data-reveal="scale"
              style={stagger(i)}
            >
              {person.photo ? (
                <span className={styles.portrait} data-tone="indigo">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="3.5rem"
                    className={styles.portraitImage}
                  />
                </span>
              ) : (
                <span className={styles.monogram} aria-hidden="true" data-tone="indigo">
                  {initials(person.name)}
                </span>
              )}
              <p className={styles.role}>{person.role}</p>
              <p className={styles.name}>{person.name}</p>
              {person.affiliations && person.affiliations.length > 0 && (
                <ul className={styles.affiliations} aria-label={`Affiliations for ${person.name}`}>
                  {person.affiliations.map((a, idx) => (
                    <li key={`${a.institution}-${idx}`} className={styles.affiliation}>
                      <span className={styles.position}>{a.position}</span>
                      <span className={styles.institution}>{a.institution}</span>
                    </li>
                  ))}
                </ul>
              )}
              {person.memberships && (
                <p className={styles.memberships}>{person.memberships}</p>
              )}
            </li>
          ))}
        </ul>

        {/* ── Event Coordinators ────────────────────────── */}
        <GroupHeader
          tag="Event Coordinators"
          title="Keeping the two days on track"
          lede="Day-of coordination, logistics liaison and the people the shortlisted teams will meet first."
          tone="teal"
        />
        <ul className={styles.people} aria-label="Event Coordinators">
          {coordinators.map((person, i) => (
            <li
              key={person.name}
              className={styles.person}
              data-tone="teal"
              data-reveal="scale"
              style={stagger(i)}
            >
              {person.photo ? (
                <span className={styles.portrait} data-tone="teal">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="3.5rem"
                    className={styles.portraitImage}
                  />
                </span>
              ) : (
                <span className={styles.monogram} aria-hidden="true" data-tone="teal">
                  {initials(person.name)}
                </span>
              )}
              <p className={styles.role}>Event coordination</p>
              <p className={styles.name}>{person.name}</p>
            </li>
          ))}
        </ul>

        {/* ── Team Members (committees) ─────────────────── */}
        <GroupHeader
          tag="Team Members"
          title="The committees behind the event"
          lede="Six working groups make RuralConnect 2026 happen — from the website you are reading now to venue, speakers, registration and awards."
          tone="amber"
        />
        <ul className={styles.committees} aria-label="Team committees">
          {committees.map((c, i) => (
            <li
              key={c.id}
              className={styles.committee}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              style={stagger(i)}
            >
              <div className={styles.committeeHead}>
                <span className={styles.committeeIndex} aria-hidden="true">
                  {String(c.id).padStart(2, "0")}
                </span>
                <h3 className={styles.committeeTitle}>{c.name}</h3>
              </div>

              {c.subgroups ? (
                <ul className={styles.subgroups}>
                  {c.subgroups.map((sg) => (
                    <li key={sg.name} className={styles.subgroup}>
                      <p className={styles.subgroupName}>{sg.name}</p>
                      {sg.lead && (
                        <p className={styles.lead}>
                          <span className={styles.leadLabel}>Lead</span>
                          <span className={styles.leadName}>{sg.lead.name}</span>
                        </p>
                      )}
                      <ul className={styles.members}>
                        {sg.members.map((m) => (
                          <li key={m} className={styles.member}>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {c.lead && (
                    <p className={styles.lead}>
                      <span className={styles.leadLabel}>Lead</span>
                      <span className={styles.leadName}>{c.lead.name}</span>
                    </p>
                  )}
                  {c.members && (
                    <ul className={styles.members}>
                      {c.members.map((m) => (
                        <li key={m} className={styles.member}>
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GroupHeader({
  tag,
  title,
  lede,
  tone,
}: {
  tag: string;
  title: string;
  lede: string;
  tone: "indigo" | "teal" | "amber";
}) {
  return (
    <header className={styles.groupHead} data-tone={tone} data-reveal>
      <p className={styles.groupTag}>
        <span className={styles.groupDot} aria-hidden="true" />
        {tag}
      </p>
      <h3 className={styles.groupTitle}>{title}</h3>
      <p className={styles.groupLede}>{lede}</p>
    </header>
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
