import type { Metadata } from "next";
import { event } from "@/content/event";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: `Page not found · ${event.identity.name}` };

export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100dvh",
        padding: "var(--gutter)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: "var(--space-5)", justifyItems: "center" }}>
        <BrandMark size={56} />
        <h1
          style={{
            fontSize: "var(--text-2xl)",
            letterSpacing: "var(--tracking-display)",
            lineHeight: 1.05,
          }}
        >
          This page doesn’t exist.
        </h1>
        <p style={{ color: "var(--color-ink-muted)" }}>
          Everything about {event.identity.name} lives on one page.
        </p>
        <ButtonLink href="/">Back to {event.identity.name}</ButtonLink>
      </div>
    </main>
  );
}
