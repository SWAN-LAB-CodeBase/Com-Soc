import type { StaticImageData } from "next/image";
import heroHillTower from "../../public/images/hero-hill-tower.jpg";
import villagePaddy from "../../public/images/village-paddy.jpg";
import trackLastMile from "../../public/images/track-last-mile.jpg";
import trackSmart from "../../public/images/track-smart.jpg";
import ideathonTeam from "../../public/images/ideathon-team.jpg";
import programmeAuditorium from "../../public/images/programme-auditorium.jpg";
import cardTeams from "../../public/images/card-teams.jpg";
import cardAttendees from "../../public/images/card-attendees.jpg";
import faqTowerHill from "../../public/images/faq-tower-hill.jpg";

/**
 * Illustrations commissioned for RuralConnect 2026. They are evocative, not
 * documentary: none depicts specific participants, speakers or venues, and
 * captions must never imply otherwise.
 */
export interface Photo {
  src: StaticImageData;
  alt: string;
  source: string;
}

export const photos = {
  hero: {
    src: heroHillTower,
    alt: "A cell tower standing on a green hilltop under a bright blue sky — illustrating connectivity for rural India",
    source: "",
  },
  village: {
    src: villagePaddy,
    alt: "A wide panorama of lush paddy fields and a tree-lined village road under a bright blue sky",
    source: "",
  },
  ideathon: {
    src: ideathonTeam,
    alt: "An ideathon hall with teams gathered around tables, whiteboards, and the RuralConnect banner on stage",
    source: "",
  },
  programme: {
    src: programmeAuditorium,
    alt: "A speaker at a university lectern presenting a networking architecture slide to a seated audience",
    source: "",
  },
  cardTeams: {
    src: cardTeams,
    alt: "Overhead view of two long tables where students collaborate on laptops, notebooks and phones",
    source: "",
  },
  cardAttendees: {
    src: cardAttendees,
    alt: "A panel of speakers on stage in a packed auditorium with a sustainability slide behind them",
    source: "",
  },
  faq: {
    src: faqTowerHill,
    alt: "A cell tower on a quiet green hilltop under drifting clouds",
    source: "",
  },
} satisfies Record<string, Photo>;

/** One photograph per challenge track, keyed by track id. */
export const trackPhotos: Record<string, Photo> = {
  "rural-comm": {
    src: trackLastMile,
    alt: "A sunlit village lane with tiled-roof homes, dense greenery and overhead power lines running down the road",
    source: "",
  },
  "ai-ml": {
    src: trackSmart,
    alt: "An agricultural drone spraying rows of green crops — AI/ML for rural India",
    source: "",
  },
};

export const allPhotos: Photo[] = [...Object.values(photos), ...Object.values(trackPhotos)];
