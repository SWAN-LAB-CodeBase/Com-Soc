import { event } from "@/content/event";
import { trackPhotos } from "@/content/media";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealImage } from "@/components/media/RevealImage";
import { TiltSurface } from "@/components/media/TiltSurface";
import mediaStyles from "@/components/media/Media.module.css";
import { TrackGlyph } from "./TrackGlyph";
import styles from "./Tracks.module.css";
import { stagger } from "@/lib/stagger";

export function Tracks() {
  const applyUrl = siteConfig.ideathonFormUrl;
  const applyHref = applyUrl ?? "#apply";
  const external = Boolean(applyUrl);
  return (
    <section id="tracks" className={styles.section} aria-labelledby="tracks-title">
      <div className={styles.inner}>
        <SectionHeader
          id="tracks-title"
          eyebrow="Challenge tracks"
          title={
            <>
              Two arenas.
              <br />
              One competition.
            </>
          }
          lede="Rural communication must be the technical core of every idea. Pick your track and apply to compete."
        />

        <ol className={styles.list}>
          {event.tracks.map((track, index) => {
            const photo = trackPhotos[track.id];
            return (
              <li key={track.id} id={`track-${track.id}`} className={styles.track}>
                {photo && (
                  <TiltSurface className={styles.media}>
                    <RevealImage
                      src={photo.src}
                      alt={photo.alt}
                      ratio="4 / 3"
                      sizes="(min-width: 64em) 40vw, (min-width: 48em) 90vw, 100vw"
                    >
                      <span className={mediaStyles.badge} data-reveal="scale">
                        <TrackGlyph glyph={track.glyph} />
                      </span>
                    </RevealImage>
                  </TiltSurface>
                )}
                <div className={styles.text} data-reveal={index % 2 === 0 ? "right" : "left"}>
                  <span className={styles.number} aria-hidden="true">
                    {track.number}
                  </span>
                  <h3 className={styles.title}>
                    <span className="visually-hidden">Track {Number(track.number)}: </span>
                    {track.title}
                  </h3>
                  <p className={styles.summary}>{track.summary}</p>
                  <p className={styles.description}>{track.description}</p>
                  <ul className={styles.focus} aria-label={`${track.title} focus areas`}>
                    {track.focus.map((f, i) => (
                      <li key={f} data-reveal="scale" style={stagger(i + 2)}>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={applyHref}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={styles.enterTrack}
                    data-reveal
                    style={stagger(4)}
                  >
                    Enter this track
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
