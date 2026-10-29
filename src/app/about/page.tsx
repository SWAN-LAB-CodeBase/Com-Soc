import type { Metadata } from "next";
import { navigation } from "@/content/navigation";
import { event } from "@/content/event";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/header/SiteHeader";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { About } from "@/components/pages/About";

export const metadata: Metadata = {
  title: `About · ${event.identity.name}`,
  description:
    "About RuralConnect — a national workshop and ideathon on rural communication and connectivity, bringing students, scholars and builders together to invent the networks rural India still needs.",
};

export default function AboutPage() {
  const applyHref = siteConfig.ideathonFormUrl ?? "/#apply";
  const attendHref = siteConfig.attendeeFormUrl ?? "/#attend";
  return (
    <>
      <SiteHeader
        nav={navigation}
        applyHref={applyHref}
        attendHref={attendHref}
        applyExternal={Boolean(siteConfig.ideathonFormUrl)}
        attendExternal={Boolean(siteConfig.attendeeFormUrl)}
      />
      <main id="main" tabIndex={-1}>
        <About />
      </main>
      <SiteFooter nav={navigation} />
    </>
  );
}
