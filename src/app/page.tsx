import { event } from "@/content/event";
import { navigation } from "@/content/navigation";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Hero } from "@/components/hero/Hero";
import { Overview } from "@/components/sections/Overview";
import { PhotoBand } from "@/components/sections/PhotoBand";
import { Tracks } from "@/components/sections/Tracks";
import { Ideathon } from "@/components/sections/Ideathon";
import { Register } from "@/components/sections/Register";
import { Programme } from "@/components/sections/Programme";
import { Organisers } from "@/components/sections/Organisers";
import { Faq } from "@/components/sections/Faq";
import { SiteFooter } from "@/components/footer/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader nav={navigation} applyHref="#apply" attendHref="#attend" />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Overview />
        <PhotoBand />
        <Tracks />
        <Ideathon />
        <Register />
        <Programme />
        <Organisers />
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
