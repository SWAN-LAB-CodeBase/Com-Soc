import Image from "next/image";
import { photos } from "@/content/media";
import styles from "./PhotoBand.module.css";

/**
 * A full-bleed photograph between Overview and Tracks. As it scrolls in, the
 * frame expands from an inset card to the full width of the page and the
 * caption rises — a pause in the reading rhythm before the challenges.
 */
export function PhotoBand() {
  return (
    <figure className={styles.band}>
      <div className={styles.frame}>
        <Image
          src={photos.village.src}
          alt={photos.village.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          className={styles.image}
        />
        <div className={styles.scrim} aria-hidden="true" />
        <figcaption className={styles.caption}>
          <span className={styles.kicker}>The last mile</span>
          <span className={styles.line}>Where the network ends,</span>
          <span className={styles.line}>the ideathon begins.</span>
        </figcaption>
      </div>
      {/* Blue and teal glows straddle the seam into the next section. */}
      <div className={styles.seam} aria-hidden="true" />
    </figure>
  );
}
