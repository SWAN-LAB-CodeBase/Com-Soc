import { event } from "@/content/event";
import { siteConfig } from "@/lib/site-config";
import { photos } from "@/content/media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealImage } from "@/components/media/RevealImage";
import { TiltSurface } from "@/components/media/TiltSurface";
import { EmailLink } from "@/components/ui/EmailLink";
import styles from "./Faq.module.css";
import { stagger } from "@/lib/stagger";

/** Native <details> disclosures: keyboard and screen-reader support built in, no JS. */
export function Faq() {
  const email = siteConfig.contactEmail;

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <SectionHeader
          id="faq-title"
          eyebrow="FAQ"
          title="Questions, answered."
          lede={
            email ? (
              <>
                Something else?{" "}
                <EmailLink email={email} />
              </>
            ) : undefined
          }
        />
        <TiltSurface className={styles.photo}>
          <RevealImage
            src={photos.faq.src}
            alt={photos.faq.alt}
            ratio="4 / 3"
            sizes="(min-width: 64em) 30vw, 100vw"
          />
        </TiltSurface>

        <div className={styles.list}>
          {event.faq.map((item, i) => (
            <details
              key={item.id}
              id={`faq-${item.id}`}
              className={styles.item}
              data-reveal="left"
              style={stagger(i % 3)}
            >
              <summary className={styles.question}>
                <span>{item.question}</span>
                <span className={styles.chevron} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
