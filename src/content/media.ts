import type { StaticImageData } from "next/image";
import heroHillTower from "../../public/images/hero-hill-tower.jpg";
import villagePaddy from "../../public/images/village-paddy.jpg";
import trackLastMile from "../../public/images/track-last-mile.jpg";
import trackResilient from "../../public/images/track-resilient.jpg";
import trackLpwan from "../../public/images/track-lpwan.jpg";
import trackSmart from "../../public/images/track-smart.jpg";
import trackInclusive from "../../public/images/track-inclusive.jpg";
import ideathonTeam from "../../public/images/ideathon-team.jpg";
import programmeAuditorium from "../../public/images/programme-auditorium.jpg";
import cardTeams from "../../public/images/card-teams.jpg";
import cardAttendees from "../../public/images/card-attendees.jpg";
import faqTowerHill from "../../public/images/faq-tower-hill.jpg";

/**
 * Stock photography, all from Unsplash under the Unsplash License (free for
 * commercial use, no attribution required — credited anyway in the footer).
 * These are illustrative: none depicts RuralConnect participants, speakers
 * or venues, and captions must never imply otherwise.
 */
export interface Photo {
  src: StaticImageData;
  alt: string;
  /** Unsplash photo page, for credits and licence checks. */
  source: string;
}

export const photos = {
  hero: {
    src: heroHillTower,
    alt: "A telecom tower and electricity poles on a green hillside in the countryside",
    source: "https://unsplash.com/photos/cQUGFpXUk1g",
  },
  village: {
    src: villagePaddy,
    alt: "Green paddy fields beside a rural road under a cloudy sky",
    source: "https://unsplash.com/photos/KbV_kERgQL8",
  },
  ideathon: {
    src: ideathonTeam,
    alt: "Students working on laptops together at long tables",
    source: "https://unsplash.com/photos/sIjqrd51grA",
  },
  programme: {
    src: programmeAuditorium,
    alt: "A speaker presenting to a large audience in an auditorium",
    source: "https://unsplash.com/photos/qzO9a6oQ8AM",
  },
  cardTeams: {
    src: cardTeams,
    alt: "Seen from above, students work together on laptops around a long table",
    source: "https://unsplash.com/photos/Dg8WzlOE1as",
  },
  cardAttendees: {
    src: cardAttendees,
    alt: "An audience seated in a lecture hall watching a presentation",
    source: "https://unsplash.com/photos/1jvRMi8V1U0",
  },
  faq: {
    src: faqTowerHill,
    alt: "A communication tower on a green hill under a cloudy sky",
    source: "https://unsplash.com/photos/9MkZQzFqLO8",
  },
} satisfies Record<string, Photo>;

/** One photograph per challenge track, keyed by track id. */
export const trackPhotos: Record<string, Photo> = {
  "last-mile": {
    src: trackLastMile,
    alt: "A village road lined with houses, trees and overhead utility lines",
    source: "https://unsplash.com/photos/b-O15p8xTns",
  },
  resilient: {
    src: trackResilient,
    alt: "Dark storm clouds gathering over a farm field",
    source: "https://unsplash.com/photos/suf2PfBNdx4",
  },
  "ai-iot-lpwan": {
    src: trackLpwan,
    alt: "Rows of young crops in a field under low golden light",
    source: "https://unsplash.com/photos/LTMaAwxanGk",
  },
  "smart-rural": {
    src: trackSmart,
    alt: "A drone flying over rows of green crops",
    source: "https://unsplash.com/photos/nMDwrS1NsIE",
  },
  inclusive: {
    src: trackInclusive,
    alt: "A farmer in a straw hat talking on a mobile phone in a field",
    source: "https://unsplash.com/photos/kZsxfzL_r5s",
  },
};

export const allPhotos: Photo[] = [...Object.values(photos), ...Object.values(trackPhotos)];
