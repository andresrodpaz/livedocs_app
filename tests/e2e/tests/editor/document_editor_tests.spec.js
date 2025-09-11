import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AuthMocks } from '../helpers/auth_helpers.js';

test.describe('Live Docs - Document Editor Tests', () => {

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
          title: 'Test Document',
          content: '',
          owner: { id: 'user_123', name: 'Test User' }
        })
      });
    });

    // 4️⃣ Ir al documento y esperar carga
    await page.goto(documentUrl);
    await page.waitForLoadState('networkidle');

    // 5️⃣ Refresh para asegurar que todo cargue correctamente
    await page.reload();
    await page.waitForLoadState('networkidle');

    console.log('✅ Cookies inyectadas, sesión mockeada y página refrescada');
  });

  test.describe('Editor Interface', () => {

    test('should display editor header', async ({ page }) => {
      await expect(page.locator('img[alt="Logo"]')).toBeVisible();
      await expect(page.locator('.document-title')).toBeVisible();

      const shareButton = page.locator('button img[alt="share"]').locator('..');
      await expect(shareButton).toBeVisible();
      await expect(page.locator('.cl-userButton-root')).toBeVisible();
    });

    test('should display toolbar', async ({ page }) => {
      await expect(page.locator('.toolbar')).toBeVisible();
      await expect(page.locator('button[aria-label="Undo"]')).toBeVisible();
      await expect(page.locator('button[aria-label="Format Bold"]')).toBeVisible();
      await expect(page.locator('.font-size-controls')).toBeVisible();
    });

    test('should display editor area', async ({ page }) => {
      await expect(page.locator('.editor-input[contenteditable="true"]')).toBeVisible();
      await expect(page.locator('.editor-placeholder')).toContainText('Enter some rich text...');
    });

  });

  test.describe('Text Editing', () => {

    test('should allow text input', async ({ page }) => {
      const editor = page.locator('.editor-input[contenteditable="true"]');
      await editor.click();
      const testText = 'This is a test document';
      await editor.fill(testText);
      await expect(editor).toContainText(testText);
    });

    test('should apply text formatting', async ({ page }) => {
      const editor = page.locator('.editor-input[contenteditable="true"]');
      const toolbar = page.locator('.toolbar');
      await editor.click();
      await editor.fill('Test formatting');
      await page.keyboard.press('Control+a');
      await toolbar.locator('button[aria-label="Format Bold"]').click();
      await toolbar.locator('button[aria-label="Format Italics"]').click();
    });

  });

  test.describe('Comments System', () => {

    test('should display comment composer', async ({ page }) => {
      await expect(page.locator('.comments-container')).toBeVisible();
      await expect(page.locator('.lb-composer-editor[contenteditable="true"]')).toBeVisible();
      await expect(page.locator('button[aria-label="Send"]')).toBeVisible();
    });

  });

  test.describe('Comments System', () => {

  test('should display comment composer', async ({ page }) => {
    // comprobar que contenedor, editor y botón están visibles
    await expect(page.locator('.comments-container')).toBeVisible();
    const composer = page.locator('.lb-composer-editor[contenteditable="true"]');
    await expect(composer).toBeVisible();
    const sendButton = page.locator('button[aria-label="Send"]');
    await expect(sendButton).toBeVisible();
  });

  test('should allow writing and sending a comment', async ({ page }) => {
    const composer = page.locator('.lb-composer-editor[contenteditable="true"]');
    const sendButton = page.locator('button[aria-label="Send"]');

    // escribir comentario
    await composer.click();
    const commentText = 'Este es un comentario de prueba';
    await page.keyboard.type(commentText);

    // comprobar que el texto se refleja en el editor
    await expect(composer).toContainText(commentText);

    // enviar el comentario
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    // esperar que aparezca en la lista de comentarios
    // (ajusta el selector al que use tu app para mostrar los comentarios)
    const newComment = page.locator('.comments-container', { hasText: commentText });
    await expect(newComment).toBeVisible();
  });

});
});
