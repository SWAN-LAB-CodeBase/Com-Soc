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

  return (
    <section id="register" className={styles.section} aria-labelledby="register-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.inner}>
        <SectionHeader
          id="register-title"
          eyebrow="Registration"
          title="Two ways to take part."
          lede="Ideathon teams and general attendees register separately. Pick the one that fits you."
        />

        <div className={styles.streams}>
          <Stream anchor="apply" stream={ideathon} tone="sand" />
          <Stream anchor="attend" stream={attendee} tone="sage" />
        </div>

        <p id="privacy" className={styles.privacy}>
          <strong>Your data.</strong> The registration forms ask only for what the organisers need
          to review applications and run the event, and responses are kept in access-restricted
          records. This website does not use cookies or analytics.
        </p>
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

  const email = siteConfig.contactEmail;
  return (
    <div className={styles.status} data-status={state.status} data-reveal="scale">
      <p className={styles.statusLabel}>
        <span className={styles.statusDot} aria-hidden="true" />
        {state.status === "closed" ? "Registration closed" : "Form opening soon"}
      </p>
      <p className={styles.statusText}>
        {state.status === "closed"
          ? "This form is no longer accepting responses."
          : "The form will be linked here as soon as it is live. Check back shortly."}
        {email && (
          <>
            {" "}
            Questions? Email <a href={`mailto:${email}`}>{email}</a>.
          </>
        )}
      </p>
    </div>
  );
}
