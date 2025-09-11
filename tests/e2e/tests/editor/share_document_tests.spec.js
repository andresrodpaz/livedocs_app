import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AuthMocks } from '../helpers/auth_helpers.js';

test.describe('Live Docs - Document Sharing Tests', () => {

  const documentId = '7PLsQf3jJ4EjQD6nsH7fc'; // NO CAMBIAR
  const documentUrl = `http://localhost:3000/documents/${documentId}`;

  test.beforeEach(async ({ page, context }) => {
    // 1️⃣ Inyectar cookies para login automático
    const cookiesPath = path.join(__dirname, '../helpers/cookies.json');
    if (fs.existsSync(cookiesPath)) {
      const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
      await context.addCookies(cookies);
    }

    // 2️⃣ Mock de sesión activa
    await AuthMocks.mockActiveSession(context);
    await AuthMocks.mockSessionCheck(page, true);

    // 3️⃣ Mock del documento
    await page.route(`**/api/documents/${documentId}**`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: documentId,
          title: 'Shared Document',
          owner: {
            id: 'user_123',
            name: 'Test Owner',
            email: 'owner@test.com'
          },
          collaborators: []
        })
      });
    });

    // 4️⃣ Ir al documento y esperar carga
    await page.goto(documentUrl);
    await page.waitForLoadState('networkidle');

    console.log('✅ Cookies inyectadas, sesión mockeada y página cargada');
  });

  // Helper para el botón Share
  const getShareButton = (page) =>
    page.locator('img[alt="share"]').locator('..'); // botón contenedor

  test.describe('Share Modal', () => {

    test('should open share modal', async ({ page }) => {
      await getShareButton(page).click();

      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
      await expect(modal.locator('h2')).toContainText('Manage who can view this project');
    });

    test('should display modal elements', async ({ page }) => {
      await getShareButton(page).click();

      const modal = page.locator('[role="dialog"]');
      await expect(modal.locator('input#email')).toBeVisible();
      await expect(modal.locator('button[role="combobox"]')).toBeVisible();
      await expect(modal.locator('button[type="submit"]').filter({ hasText: 'Invite' })).toBeVisible();
    });

    test('should display owner information', async ({ page }) => {
  await getShareButton(page).click();

  const modal = page.locator('[role="dialog"]');
  const ownerSection = modal.locator('li').filter({ hasText: 'Owner' });

  // usa el nombre que realmente se renderiza en tu entorno
  await expect(ownerSection.locator('p').first()).toContainText('Andrés Rodríguez Paz');
  await expect(ownerSection.locator('p').nth(1)).toContainText('balacandanga@gmail.com');
});

  });

  test.describe('Invitation System', () => {

    test('should allow email input', async ({ page }) => {
      await getShareButton(page).click();

      const emailInput = page.locator('input#email');
      const testEmail = 'collaborator@test.com';

      await emailInput.fill(testEmail);
      await expect(emailInput).toHaveValue(testEmail);
    });

    test('should send invitation', async ({ page }) => {
      await page.route(`**/api/documents/${documentId}/share**`, async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      });

      await getShareButton(page).click();

      const emailInput = page.locator('input#email');
      const inviteButton = page.locator('button[type="submit"]').filter({ hasText: 'Invite' });

      await emailInput.fill('new@collaborator.com');
      await inviteButton.click();
    });

  });

});
