import { describe, expect, it } from "vitest";
import { resolveRegistration } from "@/lib/registration";

const urls = {
  ideathonFormUrl: "https://forms.example.org/ideathon",
  attendeeFormUrl: null,
};

describe("resolveRegistration", () => {
  it("is open when a form URL is configured", () => {
    expect(resolveRegistration({ kind: "ideathon", closed: false }, urls)).toEqual({
      status: "open",
      url: "https://forms.example.org/ideathon",
    });
  });

  it("is opening soon when no form URL exists", () => {
    expect(resolveRegistration({ kind: "attendee", closed: false }, urls)).toEqual({
      status: "opening-soon",
    });
  });

  it("is closed when organisers close it, even with a URL", () => {
    expect(resolveRegistration({ kind: "ideathon", closed: true }, urls)).toEqual({
      status: "closed",
    });
  });
});
