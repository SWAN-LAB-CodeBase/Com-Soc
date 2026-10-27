import { expect, test, type Page } from "@playwright/test";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 1024;

// Any console error (hydration, CSP, runtime, failed request) fails the test.
let errors: string[] = [];

test.beforeEach(async ({ page }) => {
  errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
});

test.afterEach(() => {
  expect(errors, "console/page errors").toEqual([]);
});

test("has the event identity, title and confirmed dates", async ({ page }) => {
  await expect(page).toHaveTitle(/RuralConnect 2026/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("RuralConnect 2026");
  await expect(page.locator("#top")).toContainText("14–15 November 2026");
  await expect(page.locator("#top")).toContainText("Venue to be announced");
});

test("every in-page link resolves to an element on the page", async ({ page }) => {
  const hrefs = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute("href")!))]);
  expect(hrefs.length).toBeGreaterThan(10);
  for (const href of hrefs) {
    await expect(page.locator(href), `target for ${href}`).toHaveCount(1);
  }
});

test("never leaks internal planning notes or unapproved claims", async ({ page }) => {
  const text = (await page.locator("body").innerText()).toLowerCase();
  for (const leak of [
    "spoc",
    "playbook",
    "internal",
    "c5 ",
    "comsoft",
    "comsoc",
    "ieee",
    "usd",
    "tbd",
    "lorem",
  ]) {
    expect(text, `body contains "${leak}"`).not.toContain(leak);
  }
});

test("hero CTAs lead to the two registration journeys", async ({ page }) => {
  await page.locator("#top").getByRole("link", { name: "Apply for the ideathon" }).click();
  await expect(page).toHaveURL(/#apply$/);
  await expect(page.locator("#apply")).toBeInViewport();

  await page.goto("/");
  await page.locator("#top").getByRole("link", { name: "Register to attend" }).click();
  await expect(page).toHaveURL(/#attend$/);
  await expect(page.locator("#attend")).toBeInViewport();
});

test("registration states are honest when forms are not configured", async ({ page }) => {
  for (const id of ["#apply", "#attend"]) {
    await expect(page.locator(id)).toContainText("Form opening soon");
    await expect(page.locator(`${id} a[target="_blank"]`)).toHaveCount(0);
  }
});

test("desktop navigation scrolls to sections", async ({ page }) => {
  test.skip(isMobile(page), "desktop only");
  const nav = page.getByRole("navigation", { name: "Primary" });
  for (const [label, id] of [
    ["Programme", "#programme"],
    ["FAQ", "#faq"],
    ["Tracks", "#tracks"],
  ]) {
    await nav.getByRole("link", { name: label }).click();
    await expect(page.locator(id)).toBeInViewport();
  }
});

test("mobile menu opens, navigates and dismisses", async ({ page }) => {
  test.skip(!isMobile(page), "mobile only");
  const toggle = page.getByRole("button", { name: "Open menu" });
  const menu = page.getByRole("navigation", { name: "Mobile" });

  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeHidden();

  await toggle.click();
  const close = page.getByRole("button", { name: "Close menu" });
  await expect(close).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toBeVisible();

  // Escape closes and returns focus to the toggle.
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();

  // Tapping outside closes.
  await toggle.click();
  await expect(menu).toBeVisible();
  await page.mouse.click(20, 700);
  await expect(menu).toBeHidden();

  // Choosing a link navigates and closes.
  await toggle.click();
  await menu.getByRole("link", { name: "Programme" }).click();
  await expect(menu).toBeHidden();
  await expect(page.locator("#programme")).toBeInViewport();
});

test("programme day selector works with pointer and keyboard", async ({ page }) => {
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(2);
  const day1 = tabs.nth(0);
  const day2 = tabs.nth(1);
  const panels = page.getByRole("tabpanel");

  await expect(day1).toHaveAttribute("aria-selected", "true");
  await expect(panels).toHaveCount(1);
  await expect(panels).toContainText("Inspiration and build");

  await day2.click();
  await expect(day2).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Team pitches and jury scoring");

  await day2.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(day1).toBeFocused();
  await expect(day1).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(day2).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  await expect(day1).toHaveAttribute("aria-selected", "true");
});

test("FAQ disclosures open and close from the keyboard", async ({ page }) => {
  const item = page.locator("#faq-prototype");
  const summary = item.locator("summary");
  await expect(item).not.toHaveAttribute("open");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(item).toHaveAttribute("open", "");
  await expect(item).toContainText("Hardware prototypes are not required");
  await page.keyboard.press("Space");
  await expect(item).not.toHaveAttribute("open");
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("serves security headers", async ({ request }) => {
  const res = await request.get("/");
  const headers = res.headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("unknown paths render the not-found page", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  // The browser logs the intended 404 response itself; nothing else is allowed.
  errors = errors.filter((e) => !e.includes("status of 404"));
  await expect(page.getByRole("link", { name: /Back to RuralConnect 2026/ })).toBeVisible();
});
