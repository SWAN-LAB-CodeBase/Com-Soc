/**
 * Types for the centralised event configuration.
 *
 * `Confirmable<T>` makes publication status explicit: only `confirmed` values
 * are ever rendered. `pending` values carry an internal note for organisers
 * that is never shown to visitors.
 */

export type Confirmable<T> =
  { status: "confirmed"; value: T } | { status: "pending"; internalNote: string };

/** An ISO calendar date, e.g. "2026-11-14". */
export type IsoDate = `${number}-${number}-${number}`;

export interface EventIdentity {
  name: string;
  shortName: string;
  theme: string;
  /** One-line format summary, e.g. "Two-day ideathon · Invited lectures". */
  format: string;
  description: string;
}

export interface EventDates {
  start: IsoDate;
  end: IsoDate;
  timeZone: string;
}

export interface Venue {
  name: string;
  city: string;
  address?: string;
  mapUrl?: string;
}

export interface Track {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  focus: readonly string[];
  glyph: "mesh" | "resilience" | "lowpower" | "optimise" | "inclusion";
}

export interface ProcessStep {
  title: string;
  detail: string;
}

export interface RubricItem {
  criterion: string;
  weight: number;
}

export interface Ideathon {
  maxTeamSize: number;
  shortlistedTeams: number;
  reserveTeams: string;
  pitch: { presentationMinutes: number; questionMinutes: number };
  applicationIncludes: readonly string[];
  rules: readonly string[];
  process: readonly ProcessStep[];
  shortlistingRubric: readonly RubricItem[];
  finalRubric: readonly RubricItem[];
  recognition: string;
  applicationDeadline: Confirmable<IsoDate>;
  shortlistAnnouncement: Confirmable<IsoDate>;
}

export type SessionKind = "ceremony" | "lecture" | "tutorial" | "ideathon" | "break";

export interface Session {
  start: string; // "HH:MM", 24-hour, event time zone
  end: string;
  title: string;
  kind: SessionKind;
}

export interface ProgrammeDay {
  id: string;
  label: string;
  theme: string;
  date: IsoDate;
  sessions: readonly Session[];
}

export interface Programme {
  /** "provisional" renders a clear notice; "final" removes it. */
  status: "provisional" | "final";
  days: readonly ProgrammeDay[];
}

export interface Person {
  name: string;
  role: string;
  affiliation: Confirmable<string>;
}

export interface Speaker extends Person {
  /** Only `confirmed` speakers are published. */
  publication: "confirmed" | "invited";
  talkTitle?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: readonly string[];
}

export type RegistrationKind = "ideathon" | "attendee";

export interface RegistrationStream {
  kind: RegistrationKind;
  title: string;
  audience: string;
  summary: string;
  steps: readonly string[];
  conditions: readonly string[];
  /** Explicitly close a stream once capacity or the deadline is reached. */
  closed: boolean;
}

export interface EventConfig {
  identity: EventIdentity;
  dates: Confirmable<EventDates>;
  venue: Confirmable<Venue>;
  tracks: readonly Track[];
  ideathon: Ideathon;
  registration: Record<RegistrationKind, RegistrationStream>;
  programme: Programme;
  organizers: readonly Person[];
  speakers: readonly Speaker[];
  faq: readonly FaqItem[];
  social: readonly { label: string; url: string }[];
}

export interface NavItem {
  href: `#${string}`;
  label: string;
}
