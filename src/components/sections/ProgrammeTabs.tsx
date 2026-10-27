"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { IsoDate, Session, SessionKind } from "@/content/types";
import styles from "./Programme.module.css";

export interface ProgrammeTabDay {
  id: string;
  label: string;
  theme: string;
  dateLabel: string;
  dateShort: string;
  date: IsoDate;
  sessions: readonly Session[];
}

const KIND_LABEL: Record<SessionKind, string> = {
  ceremony: "Session",
  lecture: "Lecture",
  tutorial: "Tutorial",
  ideathon: "Ideathon",
  break: "Break",
};

/** WAI-ARIA tabs with automatic activation and roving tabindex. */
export function ProgrammeTabs({ days }: { days: readonly ProgrammeTabDay[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const select = (index: number) => {
    const next = (index + days.length) % days.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(days.length - 1),
    };
    const action = keys[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className={styles.tabs}>
      <div role="tablist" aria-label="Programme day" className={styles.tablist} data-reveal="scale">
        {days.map((day, i) => (
          <button
            key={day.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${day.id}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${day.id}`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
          >
            <span className={styles.tabLabel}>{day.label}</span>
            <span className={styles.tabDate}>
              <span aria-hidden="true">{day.dateShort}</span>
              <span className="visually-hidden">{day.dateLabel}</span>
            </span>
          </button>
        ))}
      </div>

      {days.map((day, i) => (
        <div
          key={day.id}
          role="tabpanel"
          id={`${baseId}-panel-${day.id}`}
          aria-labelledby={`${baseId}-tab-${day.id}`}
          hidden={i !== active}
          className={styles.panel}
          tabIndex={0}
        >
          <h3 className={styles.dayTheme}>
            <span className="visually-hidden">{day.label}, </span>
            {day.theme}
          </h3>
          <ol className={styles.sessions}>
            {day.sessions.map((s) => (
              <li
                key={`${s.start}-${s.title}`}
                className={styles.session}
                data-kind={s.kind}
                data-reveal
              >
                <p className={styles.time}>
                  <time dateTime={`${day.date}T${s.start}`}>{s.start}</time>
                  <span aria-hidden="true">–</span>
                  <span className="visually-hidden"> to </span>
                  <time dateTime={`${day.date}T${s.end}`}>{s.end}</time>
                </p>
                <p className={styles.sessionTitle}>{s.title}</p>
                {s.kind !== "break" && <p className={styles.kind}>{KIND_LABEL[s.kind]}</p>}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
