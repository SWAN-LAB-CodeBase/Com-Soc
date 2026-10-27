import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "viewport set explicitly");
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("content is fully visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hidden = await page
    .locator("[data-reveal]")
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
  expect(hidden).toBe(0);
});

test("interactive targets are at least 24×24 CSS px", async ({ page }) => {
  const small = await page
    .locator("a:visible, button:visible, summary:visible")
    .evaluateAll((els) =>
      els
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { text: (el.textContent ?? "").trim().slice(0, 40), w: r.width, h: r.height };
        })
        // Inline links inside running text are exempt under WCAG 2.5.8.
        .filter((r) => r.w < 24 || r.h < 24),
    );
  expect(small).toEqual([]);
});
