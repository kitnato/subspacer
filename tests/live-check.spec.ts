import { expect, test } from "@playwright/test";

test("dApp can load", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/Subspacer/);

  const connect = page.getByRole("button", { name: "Connect wallet" });
  const upload = page.getByRole("button", { name: "Upload to Subspace" });
  const retrieve = page.getByRole("button", { name: "Retrieve uploaded files" });

  await expect(connect).toBeEnabled();
  await expect(upload).toBeDisabled();
  await expect(retrieve).toBeDisabled();
});
