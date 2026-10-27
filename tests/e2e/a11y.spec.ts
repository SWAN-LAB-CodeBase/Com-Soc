import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test("page has no detectable WCAG A/AA violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} × ${v.help}`)).toEqual([]);
});

test("open states (menu, day 2, FAQ) have no violations", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
  }
  await page
    .getByRole("tab")
    .nth(1)
    .click({ force: info.project.name === "mobile" });
  await page.locator("#faq-selection summary").click({ force: info.project.name === "mobile" });
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} × ${v.help}`)).toEqual([]);
});
