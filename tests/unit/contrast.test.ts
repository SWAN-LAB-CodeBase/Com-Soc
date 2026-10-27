import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Reads colour tokens from globals.css so the test checks the real values. */
const css = readFileSync(new URL("../../src/app/globals.css", import.meta.url), "utf8");
const token = (name: string): string => {
  if (name.startsWith("#")) return name;
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"));
  if (!match) throw new Error(`Missing token --${name}`);
  return match[1];
};

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("brand palette", () => {
  it("keeps the approved blue and dark-teal values", () => {
    expect(token("blue-700").toUpperCase()).toBe("#1D4ED8");
    expect(token("teal-700").toUpperCase()).toBe("#0B6E66");
    expect(token("teal-800").toUpperCase()).toBe("#115E59");
  });

  it("uses no cyan-leaning colours", () => {
    expect(css).not.toMatch(/--cyan-|#5eead4|#2dd4bf|#99e9dd/i);
  });
});

const TINTS = [
  "color-bg",
  "color-surface",
  "tint-hero",
  "tint-sand",
  "tint-linen",
  "tint-oat",
  "tint-dune",
  "tint-parchment",
];

// [foreground, background, minimum ratio] for every pairing in use.
const PAIRS: [string, string, number][] = [
  // Body, secondary and accent text on every section tint
  ...TINTS.flatMap((bg): [string, string, number][] => [
    ["ink-light", bg, 4.5],
    ["ink-light-muted", bg, 4.5],
    ["blue-700", bg, 4.5], // accent text and eyebrows
    ["teal-800", bg, 4.5], // teal text (teal-700 is reserved for fills)
    ["blue-700", bg, 3], // focus ring
  ]),
  // Light teal and blue cards and panels
  ["ink-light", "teal-100", 4.5],
  ["ink-light-muted", "teal-100", 4.5],
  ["ink-light", "blue-100", 4.5],
  ["ink-light-muted", "blue-100", 4.5],
  // White text on button, step and monogram fills (every gradient stop)
  ["#ffffff", "blue-700", 4.5],
  ["#ffffff", "blue-800", 4.5],
  ["#ffffff", "teal-700", 4.5],
  ["#ffffff", "teal-800", 4.5],
  ["color-on-accent", "teal-700", 4.5],
  // Graphics (lines, dots, glows) need 3:1
  ["teal-600", "tint-hero", 3],
  ["teal-600", "color-bg", 3],
  // Photo caption sits on a navy scrim at least as dark as navy-950 at 82%
  ["ink-dark", "navy-950", 4.5],
  ["blue-300", "navy-950", 4.5],
];

describe("WCAG AA contrast", () => {
  it.each(PAIRS)("%s on %s ≥ %s:1", (fg, bg, min) => {
    expect(contrast(token(fg), token(bg))).toBeGreaterThanOrEqual(min);
  });
});
