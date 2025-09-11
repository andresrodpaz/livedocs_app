import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Live Docs - Dashboard Tests (Login vía Cookies)', () => {

  test.beforeEach(async ({ context, page }) => {
    const cookiesPath = path.join(__dirname, '../helpers/cookies.json');
    const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
    await context.addCookies(cookies);

    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');

    //await expect(page.locator('h3')).toContainText('All documents', { timeout: 10000 });
    console.log('✅ Login realizado vía cookies, continuando con tests...');
  });

  test.describe('Dashboard UI', () => {
    test('should display header elements', async ({ page }) => {
      await expect(page.locator('img[alt="Logo"]')).toBeVisible();
      await expect(page.locator('button img[alt="Inbox"]')).toBeVisible();
      await expect(page.locator('.cl-userButton-root')).toBeVisible();
    });

    test('should handle empty or populated document list', async ({ page }) => {
      const emptyContainer = page.locator('.document-list-empty');
      const documentItems = page.locator('.document-list-item');

      if (await documentItems.count() > 0) {
        console.log(`📄 Documentos encontrados: ${await documentItems.count()}`);
        const firstDoc = documentItems.first();
        await expect(firstDoc).toBeVisible();
        const titleElement = firstDoc.locator('p.line-clamp-1');
        await expect(titleElement).toBeVisible();
        const title = await titleElement.textContent();
        console.log(`📝 Primer documento: "${title}"`);
      } else {
        console.log('ℹ️ No hay documentos, mostrando contenedor vacío');
        await expect(emptyContainer).toBeVisible();

        const createButton = emptyContainer.locator('button');
        await expect(createButton).toBeVisible();
        console.log('➡️ Botón para crear documento disponible');
      }
    });
  });

  test.describe('Document Management', () => {
    test('should create new document', async ({ page }) => {



      const createButton = page.locator('button').filter({ hasText: 'Start a blank document' });
      await createButton.click();
      await page.waitForURL(/\/documents\/[^\/]+$/, { timeout: 10000 });
      await expect(page).toHaveURL(/\/documents\//);
      console.log('✅ Documento creado exitosamente');
    });

    test('should navigate back to dashboard', async ({ page }) => {
      const logoLink = page.locator('a').filter({ has: page.locator('img[alt="Logo with name"]') });
      await logoLink.click();
      await expect(page).toHaveURL('http://localhost:3000/');
      //await expect(page.locator('h3')).toContainText('All documents');
      console.log('✅ Navegación al dashboard exitosa');
    });
  });

  test.describe('User Profile', () => {
    test('should display and interact with user profile', async ({ page }) => {
      const userButton = page.locator('.cl-userButton-root');
      await expect(userButton).toBeVisible();
      await userButton.click();

      const popover = page.locator('.cl-userButtonPopoverCard[role="dialog"]');
      await expect(popover).toBeVisible();
      console.log('✅ Menú de usuario abierto');

      await expect(popover.locator('button[role="menuitem"]').filter({ hasText: 'Manage account' })).toBeVisible();
      await expect(popover.locator('button[role="menuitem"]').filter({ hasText: 'Sign out' })).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(popover).not.toBeVisible();
      console.log('✅ User menu closed');
    });
  });

});
