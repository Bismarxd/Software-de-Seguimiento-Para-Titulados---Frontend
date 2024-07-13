const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/registro");
});

test.describe("Registro", () => {
  test("Debe mostrar un mensaje de éxito después de enviar el formulario de registro", async ({
    page,
  }) => {
    // Esperar a que la página cargue completamente
    await page.waitForLoadState("load");

    // Verifica que los elementos estén presentes
    await page.waitForSelector('input[name="nombre"]');
    await page.waitForSelector('input[name="apellidoPaterno"]');
    await page.waitForSelector('input[name="apellidoMaterno"]');
    await page.waitForSelector('input[name="direccion"]');
    await page.waitForSelector('input[name="fechaNacimiento"]');
    await page.waitForSelector('input[name="ci"]');
    await page.waitForSelector('input[name="celular"]');

    await page.waitForSelector('input[name="email"]');

    // Llenar los campos del formulario
    await page.fill('input[name="nombre"]', "Mario");
    await page.fill('input[name="apellidoPaterno"]', "Rivera");
    await page.fill('input[name="apellidoMaterno"]', "Vega");
    await page.fill('input[name="direccion"]', "Zona. Periferica Calle. 10");
    await page.fill('input[name="fechaNacimiento"]', "2023-07-12"); // Ajusta el formato según sea necesario
    await page.fill('input[name="ci"]', "123456");
    await page.fill('input[name="celular"]', "6876543");

    await page.fill('input[name="email"]', "mario35@mario.com");

    // Hacer clic en el botón de envío del formulario
    await page.click('button[name="Enviar"]');
  });
});
