import type { RegistrationKind, RegistrationStream } from "@/content/types";
import type { SiteConfig } from "./site-config";

export type RegistrationState =
  { status: "open"; url: string } | { status: "opening-soon" } | { status: "closed" };

/**
 * A stream is open only when a verified HTTPS form URL is configured and the
 * organisers have not closed it. Without a URL the site says so honestly
 * rather than showing a button that leads nowhere.
 */
export function resolveRegistration(
  stream: Pick<RegistrationStream, "kind" | "closed">,
  config: Pick<SiteConfig, "ideathonFormUrl" | "attendeeFormUrl">,
): RegistrationState {
  if (stream.closed) return { status: "closed" };
  const url = formUrlFor(stream.kind, config);
  return url ? { status: "open", url } : { status: "opening-soon" };
}

function formUrlFor(
  kind: RegistrationKind,
  config: Pick<SiteConfig, "ideathonFormUrl" | "attendeeFormUrl">,
): string | null {
  return kind === "ideathon" ? config.ideathonFormUrl : config.attendeeFormUrl;
}
