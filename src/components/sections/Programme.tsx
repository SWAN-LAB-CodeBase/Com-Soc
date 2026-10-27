import { event } from "@/content/event";
import { formatDayHeading, formatDayShort } from "@/lib/format";
import { photos } from "@/content/media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealImage } from "@/components/media/RevealImage";
import { ProgrammeTabs, type ProgrammeTabDay } from "./ProgrammeTabs";
import styles from "./Programme.module.css";

export function Programme() {
  const { programme } = event;

  // Format on the server so the client component stays small and free of date logic.
  const days: ProgrammeTabDay[] = programme.days.map((day) => ({
    id: day.id,
    label: day.label,
    theme: day.theme,
    dateLabel: formatDayHeading(day.date),
    dateShort: formatDayShort(day.date),
    date: day.date,
    sessions: day.sessions,
  }));

  return (
    <section id="programme" className={styles.section} aria-labelledby="programme-title">
      <div className={styles.inner}>
        <SectionHeader
          id="programme-title"
          eyebrow="Programme"
          title="Two days, by design."
          lede="Day one is for inspiration and building; day two is for pitching and recognition. Lectures and tutorials run alongside the ideathon."
        />

        <RevealImage
          src={photos.programme.src}
          alt={photos.programme.alt}
          ratio="21 / 8"
          sizes="(min-width: 72rem) 72rem, 100vw"
          className={styles.banner}
        />

        {programme.status === "provisional" && (
          <p className={styles.notice}>
            <strong>Provisional programme.</strong> Timings may change, and speakers and session
            titles are announced once confirmed.
          </p>
        )}

        <ProgrammeTabs days={days} />
      </div>
    </section>
  );
}
