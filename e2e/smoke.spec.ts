import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home page loads in English", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/Hakka Hydro Tirta/i);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("Indonesian locale loads", async ({ page }) => {
    await page.goto("/id");
    await expect(page).toHaveTitle(/Hakka Hydro Tirta/i);
  });

  test("services page loads", async ({ page }) => {
    await page.goto("/en/service");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("service detail page loads", async ({ page }) => {
    await page.goto("/en/service/sea-freight");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("portfolio page loads", async ({ page }) => {
    await page.goto("/en/portfolio");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
