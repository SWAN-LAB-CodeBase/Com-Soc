/**
 * Deployment-specific settings read from environment variables at build time.
 * Values are validated; anything malformed is treated as "not configured" so
 * the site never renders a broken link.
 */

export interface SiteConfig {
  siteUrl: URL | null;
  ideathonFormUrl: string | null;
  attendeeFormUrl: string | null;
  contactEmail: string | null;
}

type Env = Record<string, string | undefined>;

export function parseHttpsUrl(value: string | undefined): URL | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

const EMAIL_PATTERN = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-z]{2,}$/i;

export function parseEmail(value: string | undefined): string | null {
  const email = value?.trim();
  return email && EMAIL_PATTERN.test(email) ? email : null;
}

export function readSiteConfig(env: Env = process.env): SiteConfig {
  return {
    siteUrl: parseHttpsUrl(env.SITE_URL),
    ideathonFormUrl: parseHttpsUrl(env.IDEATHON_FORM_URL)?.href ?? null,
    attendeeFormUrl: parseHttpsUrl(env.ATTENDEE_FORM_URL)?.href ?? null,
    contactEmail: parseEmail(env.CONTACT_EMAIL),
  };
}

export const siteConfig = readSiteConfig();
