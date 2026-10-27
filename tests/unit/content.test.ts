import { describe, expect, it } from "vitest";
import { event } from "@/content/event";
import { navigation } from "@/content/navigation";
import { minutesOf } from "@/lib/format";

describe("event content integrity", () => {
  it("publishes exactly the five verified challenge tracks, in order", () => {
    expect(event.tracks.map((t) => t.title)).toEqual([
      "Last-mile access",
      "Resilient networks",
      "AI-IoT and LPWAN",
      "Smart rural networks",
      "Inclusive applications",
    ]);
    expect(new Set(event.tracks.map((t) => t.id)).size).toBe(5);
  });

  it("keeps the verified team rules", () => {
    expect(event.ideathon.maxTeamSize).toBe(2);
    expect(event.ideathon.shortlistedTeams).toBe(20);
  });

  it.each([
    ["shortlisting", event.ideathon.shortlistingRubric],
    ["final", event.ideathon.finalRubric],
  ])("%s rubric weights sum to 100", (_, rubric) => {
    expect(rubric.reduce((sum, r) => sum + r.weight, 0)).toBe(100);
  });

  it("uses the confirmed Saturday–Sunday dates from the planning deck", () => {
    expect(event.dates).toEqual({
      status: "confirmed",
      value: { start: "2026-11-14", end: "2026-11-15", timeZone: "Asia/Kolkata" },
    });
  });

  it("schedules each programme day within the event dates", () => {
    if (event.dates.status !== "confirmed") return;
    const { start, end } = event.dates.value;
    for (const day of event.programme.days) {
      expect(day.date >= start && day.date <= end).toBe(true);
    }
  });

  it.each(event.programme.days.map((d) => [d.label, d] as const))(
    "%s sessions are chronological and do not overlap",
    (_, day) => {
      day.sessions.forEach((s, i) => {
        expect(minutesOf(s.end)).toBeGreaterThan(minutesOf(s.start));
        const next = day.sessions[i + 1];
        if (next) expect(minutesOf(next.start)).toBeGreaterThanOrEqual(minutesOf(s.end));
      });
    },
  );

  it("does not publish unverified facts", () => {
    expect(event.venue.status).toBe("pending");
    expect(event.speakers.filter((s) => s.publication === "confirmed")).toHaveLength(0);
    const text = JSON.stringify(event).toLowerCase();
    // Prize amounts and unapproved branding must not appear in public content.
    for (const banned of ["₹", "$", "usd", "inr", "ieee", "comsoc", "comsoft"]) {
      const publicText = text.replace(/"internalnote":"[^"]*"/g, "");
      expect(publicText).not.toContain(banned);
    }
  });

  it("has unique FAQ ids and navigation targets", () => {
    expect(new Set(event.faq.map((f) => f.id)).size).toBe(event.faq.length);
    expect(new Set(navigation.map((n) => n.href)).size).toBe(navigation.length);
  });
});
