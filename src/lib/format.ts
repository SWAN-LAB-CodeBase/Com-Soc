import type { EventDates, IsoDate } from "@/content/types";

const LOCALE = "en-GB";

/** Parse an ISO date as a calendar day (noon UTC avoids any day shift). */
function toDate(iso: IsoDate): Date {
  return new Date(`${iso}T12:00:00Z`);
}

function parts(iso: IsoDate) {
  const date = toDate(iso);
  const get = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(LOCALE, { timeZone: "UTC", ...options }).format(date);
  return {
    day: get({ day: "numeric" }),
    month: get({ month: "long" }),
    year: get({ year: "numeric" }),
    weekday: get({ weekday: "long" }),
    weekdayShort: get({ weekday: "short" }),
  };
}

/** "14–15 November 2026", or a full range when months/years differ. */
export function formatDateRange({ start, end }: Pick<EventDates, "start" | "end">): string {
  const a = parts(start);
  const b = parts(end);
  if (start === end) return `${a.day} ${a.month} ${a.year}`;
  if (a.year !== b.year) return `${a.day} ${a.month} ${a.year} – ${b.day} ${b.month} ${b.year}`;
  if (a.month !== b.month) return `${a.day} ${a.month} – ${b.day} ${b.month} ${b.year}`;
  return `${a.day}–${b.day} ${a.month} ${a.year}`;
}

/** "Saturday 14 November" */
export function formatDayHeading(iso: IsoDate): string {
  const p = parts(iso);
  return `${p.weekday} ${p.day} ${p.month}`;
}

/** "Saturday and Sunday" for a two-day range, "Saturday to Monday" otherwise. */
export function formatWeekdayRange({ start, end }: Pick<EventDates, "start" | "end">): string {
  const a = parts(start).weekday;
  const b = parts(end).weekday;
  if (start === end) return a;
  const days = Math.round((toDate(end).getTime() - toDate(start).getTime()) / 86_400_000);
  return `${a} ${days === 1 ? "and" : "to"} ${b}`;
}

/** "Sat 14 Nov" */
export function formatDayShort(iso: IsoDate): string {
  const date = toDate(iso);
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  })
    .format(date)
    .replace(",", "");
}

/** Converts "HH:MM" to minutes past midnight. */
export function minutesOf(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
