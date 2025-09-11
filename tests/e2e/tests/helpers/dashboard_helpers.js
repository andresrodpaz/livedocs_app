import { expect } from '@playwright/test';

export class DashboardMocks {
  
  static async mockCreateDocument(page, newDoc = {}) {
    const defaultDoc = {
      id: `doc_${Date.now()}`,
      title: 'Untitled',
      createdAt: new Date().toISOString(),
      content: ''
    };

    const docToCreate = { ...defaultDoc, ...newDoc };

    await page.route('**/api/documents**', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(docToCreate)
        });
      }
    });

    await page.route(`**/documents/${docToCreate.id}**`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <div id="document-editor">
                <div class="document-title">${docToCreate.title}</div>
                <div class="editor-input" contenteditable="true"></div>
              </div>
            </body>
          </html>
        `
      });
    });

    return docToCreate;
  }

  static async mockDeleteDocument(page, documentId) {
    await page.route(`**/api/documents/${documentId}**`, async route => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, deletedId: documentId })
        });
      }
    });
  }
}

export class DashboardActions {
  
  static async createNewDocument(page) {
    const createButton = page.locator('button').filter({ hasText: 'Start a blank document' });
    await createButton.click();
  }

  static async deleteDocument(page, documentTitle, confirm = true) {
    const docItem = page.locator('.document-list-item').filter({ hasText: documentTitle });
    const deleteButton = docItem.locator('button img[alt="delete"]').locator('..');
    
    await deleteButton.click();
    
    if (confirm) {
      const confirmButton = page.locator('button').filter({ 
        hasText: /Delete|Confirm|Yes|Remove/ 
      });
      await confirmButton.click();
    }
  }

  static async waitForDashboardLoad(page) {
    await page.waitForSelector('h3:has-text("All documents")', { timeout: 10000 });
    await page.waitForSelector('.document-ul', { timeout: 10000 });
  }
}

export class DashboardAssertions {
  
  static async expectDocumentCount(page, expectedCount) {
    await expect(page.locator('.document-list-item')).toHaveCount(expectedCount);
  }

  static async expectDocumentExists(page, documentTitle) {
    await expect(
      page.locator('.document-list-item').filter({ hasText: documentTitle })
    ).toBeVisible();
  }

  static async expectDocumentNotExists(page, documentTitle) {
    await expect(
      page.locator('.document-list-item').filter({ hasText: documentTitle })
    ).toHaveCount(0);
  }
}
