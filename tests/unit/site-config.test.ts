import { describe, expect, it } from "vitest";
import { parseEmail, parseHttpsUrl, readSiteConfig } from "@/lib/site-config";

describe("parseHttpsUrl", () => {
  it("accepts https URLs", () => {
    expect(parseHttpsUrl("https://forms.example.org/apply")?.href).toBe(
      "https://forms.example.org/apply",
    );
  });

  it.each([
    undefined,
    "",
    "   ",
    "http://example.org",
    "javascript:alert(1)",
    "not a url",
    "/apply",
  ])("rejects %s", (value) => {
    expect(parseHttpsUrl(value)).toBeNull();
  });
});

describe("parseEmail", () => {
  it("accepts a plain address and trims it", () => {
    expect(parseEmail("  team@example.org ")).toBe("team@example.org");
  });

  it.each([undefined, "", "team", "team@", "a b@example.org", "x@y", "<x@y.org>"])(
    "rejects %s",
    (value) => {
      expect(parseEmail(value)).toBeNull();
    },
  );
});

describe("readSiteConfig", () => {
  it("treats a missing environment as unconfigured", () => {
    expect(readSiteConfig({})).toEqual({
      siteUrl: null,
      ideathonFormUrl: null,
      attendeeFormUrl: null,
      contactEmail: null,
    });
  });

  it("drops malformed values instead of rendering broken links", () => {
    const config = readSiteConfig({
      SITE_URL: "https://ruralconnect.example.org",
      IDEATHON_FORM_URL: "http://insecure.example.org/form",
      ATTENDEE_FORM_URL: "https://forms.example.org/attend",
      CONTACT_EMAIL: "nope",
    });
    expect(config.siteUrl?.origin).toBe("https://ruralconnect.example.org");
    expect(config.ideathonFormUrl).toBeNull();
    expect(config.attendeeFormUrl).toBe("https://forms.example.org/attend");
    expect(config.contactEmail).toBeNull();
  });
});
