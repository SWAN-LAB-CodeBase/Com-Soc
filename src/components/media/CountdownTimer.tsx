"use client";

import { useState, useEffect } from "react";
import styles from "./CountdownTimer.module.css";

interface Props {
  targetDate: string; // ISO 8601 (UTC)
  className?: string;
}

/**
 * Counts down to targetDate, updating every second.
 * Renders null server-side and before the first client tick to avoid
 * a hydration mismatch — the gap is imperceptible.
 */
export function CountdownTimer({ targetDate, className }: Props) {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => setDiff(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (diff === null) return null;

  // Hide once the event has started or if the date is unreasonably far out.
  const days = Math.floor(diff / 864e5);
  if (diff === 0 || days > 400) return null;

  const hours = Math.floor((diff % 864e5) / 36e5);
  const minutes = Math.floor((diff % 36e5) / 6e4);
  const seconds = Math.floor((diff % 6e4) / 1e3);

  return (
    <div
      className={[styles.timer, className].filter(Boolean).join(" ")}
      aria-label={`Registration closes in ${days} days ${hours} hours ${minutes} minutes`}
      aria-live="off"
    >
      <div className={styles.labelWrap}>
        <span className={styles.pulse} aria-hidden="true">
          <span className={styles.pulseDot} />
        </span>
        <span className={styles.label}>Registration Closes on</span>
      </div>
      <div className={styles.units} aria-hidden="true">
        <Unit value={days} unit="Days" />
        <span className={styles.sep} />
        <Unit value={hours} unit="Hours" />
        <span className={styles.sep} />
        <Unit value={minutes} unit="Minutes" />
        <span className={styles.sep} />
        <Unit value={seconds} unit="Seconds" />
      </div>
    </div>
  );
}

function Unit({ value, unit }: { value: number; unit: string }) {
  return (
    <span className={styles.unit}>
      <span className={styles.value}>{String(value).padStart(2, "0")}</span>
      <span className={styles.unitLabel}>{unit}</span>
    </span>
  );
}
