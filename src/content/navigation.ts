import type { NavItem } from "@/content/types";

/** In-page sections, in page order. Each href must match a section id. */
export const navigation: readonly NavItem[] = [
  { href: "/#overview", label: "Overview" },
  { href: "/#tracks", label: "Tracks" },
  { href: "/#ideathon", label: "Ideathon" },
  { href: "/#programme", label: "Programme" },
  { href: "/#organisers", label: "People" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];
