import { event } from "@/content/event";
import type { RegistrationStream } from "@/content/types";
import { resolveRegistration, type RegistrationState } from "@/lib/registration";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./Register.module.css";
import { stagger } from "@/lib/stagger";

const ACTION_LABEL = {
  ideathon: "Open the ideathon application",
  attendee: "Open the attendee registration",
} as const;

export function Register() {
  const { ideathon, attendee } = event.registration;
  const email = siteConfig.contactEmail;

  return (
    <section id="register" className={styles.section} aria-labelledby="register-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.inner}>
        <SectionHeader
          id="register-title"
          eyebrow="Registration"
          title="Ready to compete?"
          lede="Ideathon applications and attendee spots are both limited. Secure yours before they fill up."
        />

        <div className={styles.streams}>
          <Stream anchor="apply" stream={ideathon} tone="sand" />
          <Stream anchor="attend" stream={attendee} tone="sage" />
        </div>

        {email && (
          <div className={styles.contactRow}>
            <a href={`mailto:${email}`} className={styles.contactBtn}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z" />
                <path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z" />
              </svg>
              Have questions? Contact us
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Stream({
  anchor,
  stream,
  tone,
}: {
  anchor: string;
  stream: RegistrationStream;
  tone: "sand" | "sage";
}) {
  const state = resolveRegistration(stream, siteConfig);
  const titleId = `${anchor}-title`;

  return (
    <article
      id={anchor}
      className={styles.stream}
      data-tone={tone}
      aria-labelledby={titleId}
      data-reveal={tone === "sand" ? "left" : "right"}
    >
      <h3 id={titleId} className={styles.streamTitle}>
        {stream.title}
      </h3>
      <p className={styles.audience}>{stream.audience}</p>
      <p className={styles.summary}>{stream.summary}</p>

      <h4 className={styles.subhead}>How it works</h4>
      <ol className={styles.steps}>
        {stream.steps.map((step, i) => (
          <li key={step} data-reveal="left" style={stagger(i)}>
            {step}
          </li>
        ))}
      </ol>

      <h4 className={styles.subhead}>Good to know</h4>
      <ul className={styles.conditions}>
        {stream.conditions.map((c, i) => (
          <li key={c} data-reveal style={stagger(i)}>
            {c}
          </li>
        ))}
      </ul>

      <div className={styles.action}>
        <RegistrationAction state={state} label={ACTION_LABEL[stream.kind]} />
      </div>
    </article>
  );
}

function RegistrationAction({ state, label }: { state: RegistrationState; label: string }) {
  if (state.status === "open") {
    return (
      <ButtonLink href={state.url} external size="large" className={styles.cta}>
        {label}
      </ButtonLink>
    );
  }

  return (
    <div className={styles.status} data-status={state.status} data-reveal="scale">
      <p className={styles.statusLabel}>
        <span className={styles.statusDot} aria-hidden="true" />
        {state.status === "closed" ? "Registration closed" : "Form opening soon"}
      </p>
    </div>
  );
}
