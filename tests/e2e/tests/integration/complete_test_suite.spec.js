import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AuthMocks, AuthAssertions } from '../helpers/auth_helpers.js';
import { DashboardMocks, DashboardActions, DashboardAssertions } from '../helpers/dashboard_helpers.js';

test.describe('Live Docs - Complete E2E User Journey', () => {

  test('new user: signup → dashboard → create → edit → comment → share → delete', async ({ page, context }) => {
    console.log('🔹 Starting complete E2E journey');

    // 1️⃣ Ir a la página de Sign-up
    await page.goto('http://localhost:3000/sign-up');
    await page.waitForLoadState('networkidle');

    // 2️⃣ Mockear sign-up exitoso
    await AuthMocks.mockSuccessfulGoogleSignup(page, '/');
    await AuthAssertions.expectSuccessfulLogin(page, '/');

    // 3️⃣ Inyectar cookies
    const cookiesPath = path.join(__dirname, '../helpers/cookies.json');
    if (fs.existsSync(cookiesPath)) {
      const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
      await context.addCookies(cookies);
      console.log('✅ Cookies inyectadas');
    }

    // 4️⃣ Ir al dashboard
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    await DashboardActions.waitForDashboardLoad(page);

    // 5️⃣ Crear nuevo documento
    await DashboardActions.createNewDocument(page);

    // 6️⃣ Capturar el ID real del documento de la URL
    await page.waitForURL(/\/documents\/.+/, { timeout: 10000 });
    const docUrl = page.url();
    const docId = docUrl.split('/').pop();
    console.log('📄 Nuevo documento creado con ID:', docId);

    // 7️⃣ Navegar explícitamente al documento usando el ID
    await page.goto(`http://localhost:3000/documents/${docId}`);
    await page.waitForLoadState('networkidle');

    // 8️⃣ Cambiar título del documento
    const editIcon = page.locator('.document-title + img[alt="edit"]');
    await editIcon.click();

    const titleInput = page.locator('.document-title-input');
    const newTitle = 'E2E Test Document';
    await titleInput.fill(newTitle);
    await titleInput.press('Enter'); // confirmar cambio
    await expect(page.locator('.document-title')).toHaveText(newTitle);
    console.log('✏️ Title updated:', newTitle);

    // 9️⃣ Editar contenido del documento
    const editor = page.locator('.editor-input[contenteditable="true"]');
    await editor.click();
    const content = 'This is test content for E2E';
    await editor.fill(content);
    await expect(editor).toContainText(content);

    // 🔟 Añadir comentario
    const commentBox = page.locator('.lb-composer-editor[contenteditable="true"]');
    await commentBox.click();
    const commentText = 'This is a test comment';
    await commentBox.fill(commentText);
    const sendButton = page.locator('button[aria-label="Send"]');
    await sendButton.click();
    console.log('💬 Comment added');

    // 1️⃣1️⃣ Compartir documento
    await page.route(`**/api/documents/${docId}/share**`, async route => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });
    const shareButton = page.locator('button img[alt="share"]').locator('..');
    await shareButton.click();

    const shareModal = page.locator('[role="dialog"]');
    await expect(shareModal).toBeVisible();
    const emailInput = shareModal.locator('input#email');
    await emailInput.fill('collaborator@test.com');
    const inviteButton = shareModal.locator('button[type="submit"]').filter({ hasText: 'Invite' });
    await inviteButton.click();
    console.log('📤 Document shared');

    // 1️⃣2️⃣ Volver al dashboard
    const logoLink = page.locator('a').filter({ has: page.locator('img[alt="Logo"]') });
    await logoLink.click();
    await page.waitForLoadState('networkidle');
    await DashboardActions.waitForDashboardLoad(page);

    // 1️⃣3️⃣ Eliminar documento
    const initialCount = await page.locator('.document-list-item').count();
    await DashboardMocks.mockDeleteDocument(page, docId);
    await DashboardActions.deleteDocument(page, newTitle);
    await DashboardAssertions.expectDocumentCount(page, initialCount);
    console.log('🗑 Document deleted');

    console.log('✅ Complete E2E journey finished successfully');
  });

});
