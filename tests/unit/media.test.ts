import { describe, expect, it } from "vitest";
import { event } from "@/content/event";
import { allPhotos, trackPhotos } from "@/content/media";

describe("photography", () => {
  it("has a photo for every challenge track", () => {
    for (const track of event.tracks) expect(trackPhotos[track.id], track.id).toBeDefined();
  });

  it.each(allPhotos.map((p) => [p.source, p] as const))(
    "%s has meaningful alt text and a source",
    (_, p) => {
      expect(p.alt.length).toBeGreaterThan(20);
      expect(p.alt.toLowerCase()).not.toMatch(/^(image|photo|picture) of/);
      expect(p.source).toMatch(/^https:\/\/unsplash\.com\/photos\//);
    },
  );
});
