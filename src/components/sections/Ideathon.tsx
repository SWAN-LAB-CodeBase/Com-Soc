import { event } from "@/content/event";
import type { RubricItem } from "@/content/types";
import { formatDayHeading } from "@/lib/format";
import { photos } from "@/content/media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealImage } from "@/components/media/RevealImage";
import { TiltSurface } from "@/components/media/TiltSurface";
import { ActivateOnView } from "@/components/media/ActivateOnView";
import styles from "./Ideathon.module.css";
import { stagger } from "@/lib/stagger";

export function Ideathon() {
  const { ideathon } = event;
  const deadline = ideathon.applicationDeadline;

  return (
    <section id="ideathon" className={styles.section} aria-labelledby="ideathon-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeader
            id="ideathon-title"
            eyebrow="The ideathon"
            title="From idea to pitch in two days."
            lede={`Up to ${ideathon.shortlistedTeams} shortlisted teams develop a rural networking idea on site with mentors, then pitch it to a technical jury.`}
          />
          <TiltSurface className={styles.photo}>
            <RevealImage
              src={photos.ideathon.src}
              alt={photos.ideathon.alt}
              ratio="3 / 2"
              sizes="(min-width: 64em) 45vw, 100vw"
            />
          </TiltSurface>
        </div>

        <ActivateOnView className={styles.steps} aria-label="Ideathon stages">
          {ideathon.process.map((step, i) => (
            <li key={step.title} className={styles.step} data-reveal style={stagger(i)}>
              {/* A 3D ball that jumps and bounces as the line reaches it. */}
              <span className={styles.stepIndex} aria-hidden="true">
                <span className={styles.ball}>{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ActivateOnView>

        <div className={styles.columns}>
          <div data-reveal>
            <h3 className={styles.columnTitle}>What your application includes</h3>
            <ul className={styles.checklist}>
              {ideathon.applicationIncludes.map((item, i) => (
                <li key={item} data-reveal="left" style={stagger(i)}>
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              {deadline.status === "confirmed"
                ? `Applications close on ${formatDayHeading(deadline.value)}.`
                : "The application deadline is published with the application form."}
            </p>
          </div>
          <div data-reveal>
            <h3 className={styles.columnTitle}>Ground rules</h3>
            <ul className={styles.rules}>
              <li>
                Teams of up to {ideathon.maxTeamSize} people: a team leader and an optional second
                member.
              </li>
              {ideathon.rules.map((rule, i) => (
                <li key={rule} data-reveal="right" style={stagger(i + 1)}>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.rubrics}>
          <Rubric
            title="How applications are shortlisted"
            caption="Each application is scored by at least three reviewers."
            items={ideathon.shortlistingRubric}
          />
          <Rubric
            title="How final pitches are scored"
            caption={`${ideathon.pitch.presentationMinutes}-minute presentation, then ${ideathon.pitch.questionMinutes} minutes of questions from the jury.`}
            items={ideathon.finalRubric}
          />
        </div>

        <p className={styles.recognition} data-reveal="scale">
          <span className={styles.medals} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {ideathon.recognition}
        </p>
      </div>
    </section>
  );
}

function Rubric({
  title,
  caption,
  items,
}: {
  title: string;
  caption: string;
  items: readonly RubricItem[];
}) {
  return (
    <div className={styles.rubric} data-reveal>
      <h3 className={styles.columnTitle}>{title}</h3>
      <p className={styles.rubricCaption}>{caption}</p>
      <dl>
        {items.map((item, i) => (
          <div key={item.criterion} data-reveal style={stagger(i)}>
            <dt>{item.criterion}</dt>
            <dd>
              {item.weight}
              <span aria-hidden="true">%</span>
              <span className="visually-hidden"> percent</span>
            </dd>
            {/* Weight bar: grows to its share as the row scrolls in. */}
            <span className={styles.bar} aria-hidden="true">
              <span
                data-reveal="grow"
                style={{ ...stagger(i + 1), width: `${item.weight * 2}%` }}
              />
            </span>
          </div>
        ))}
      </dl>
    </div>
  );
}
