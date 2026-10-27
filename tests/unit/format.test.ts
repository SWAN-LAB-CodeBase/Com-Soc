import { describe, expect, it } from "vitest";
import {
  formatDateRange,
  formatDayHeading,
  formatDayShort,
  formatWeekdayRange,
  minutesOf,
} from "@/lib/format";

describe("date formatting", () => {
  it("formats a same-month range", () => {
    expect(formatDateRange({ start: "2026-11-14", end: "2026-11-15" })).toBe("14–15 November 2026");
  });

  it("formats a cross-month range", () => {
    expect(formatDateRange({ start: "2026-10-31", end: "2026-11-01" })).toBe(
      "31 October – 1 November 2026",
    );
  });

  it("names the weekdays of a two-day event", () => {
    expect(formatWeekdayRange({ start: "2026-11-14", end: "2026-11-15" })).toBe(
      "Saturday and Sunday",
    );
  });

  it("formats day headings", () => {
    expect(formatDayHeading("2026-11-14")).toBe("Saturday 14 November");
    expect(formatDayShort("2026-11-15")).toBe("Sun 15 Nov");
  });

  it("converts clock times to minutes", () => {
    expect(minutesOf("09:30")).toBe(570);
  });
});
