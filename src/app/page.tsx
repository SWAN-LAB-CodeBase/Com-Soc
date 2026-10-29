import { event } from "@/content/event";
import { navigation } from "@/content/navigation";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Hero } from "@/components/hero/Hero";
import { Overview } from "@/components/sections/Overview";
import { PhotoBand } from "@/components/sections/PhotoBand";
import { Tracks } from "@/components/sections/Tracks";
import { ChallengeTopics } from "@/components/sections/ChallengeTopics";
import { Ideathon } from "@/components/sections/Ideathon";
import { Prizes } from "@/components/sections/Prizes";
import { Posters } from "@/components/sections/Posters";
import { Register } from "@/components/sections/Register";
import { Programme } from "@/components/sections/Programme";
import { Organisers } from "@/components/sections/Organisers";
import { AboutUs } from "@/components/sections/AboutUs";
import { Faq } from "@/components/sections/Faq";
import { SiteFooter } from "@/components/footer/SiteFooter";

export default function Home() {
  const applyHref = siteConfig.ideathonFormUrl ?? "#apply";
  return (
    <>
      <SiteHeader
        nav={navigation}
        applyHref={applyHref}
        applyExternal={Boolean(siteConfig.ideathonFormUrl)}
      />
      <main id="main" tabIndex={-1}>
        <Hero />
        <ChallengeTopics />
        <Overview />
        <PhotoBand />
        <Tracks />
        <Ideathon />
        <Prizes />
        <Posters />
        <Register />
        <Programme />
        <Organisers />
        <AboutUs />
        <Faq />
      </main>
      <SiteFooter nav={navigation} />
      <EventStructuredData />
    </>
  );
}

/**
 * schema.org Event markup, emitted only when every required fact (dates,
 * venue and a production URL) is confirmed — never with placeholder data.
 */
function EventStructuredData() {
  const { dates, venue, identity } = event;
  if (dates.status !== "confirmed" || venue.status !== "confirmed" || !siteConfig.siteUrl) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: identity.name,
    description: identity.description,
    startDate: dates.value.start,
    endDate: dates.value.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: siteConfig.siteUrl.href,
    location: {
      "@type": "Place",
      name: venue.value.name,
      address: venue.value.address ?? venue.value.city,
    },
    organizer: event.organizers.map((p) => ({ "@type": "Person", name: p.name })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
