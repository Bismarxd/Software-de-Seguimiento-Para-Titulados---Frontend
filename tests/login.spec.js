const { test, expect } = require("playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Inicio de Sesión", () => {
  test("mensaje", async ({ page }) => {
    // Ingresar credenciales y hacer clic en el botón de inicio de sesión
    await page.fill("input[name=email]", "correo@correo.com");
    await page.fill("input[name=password]", "123456lp");
    await page.click("button[name=submit]");
  });
});
