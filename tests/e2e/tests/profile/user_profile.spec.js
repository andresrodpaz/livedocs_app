import { test, expect } from '@playwright/test';
import { AuthMocks } from '../helpers/auth_helpers.js';

test.describe('Live Docs - User Profile Tests', () => {

  test.beforeEach(async ({ page }) => {

    const cookiesPath = path.join(__dirname, '../helpers/cookies.json');
        const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
        await context.addCookies(cookies);
    
        await page.goto('http://localhost:3000/');
        await page.waitForLoadState('networkidle');
    
      
        console.log('✅ Login realizado vía cookies, continuando con tests...');
  });

  test.describe('User Popover', () => {
    
    test('should open user popover', async ({ page }) => {
      await page.locator('button[aria-label="Open user button"]').click();
      
      const popover = page.locator('.cl-userButtonPopoverCard[role="dialog"]');
      await expect(popover).toBeVisible();
    });

    test('should display user information', async ({ page }) => {
      await page.locator('button[aria-label="Open user button"]').click();
      
      const popover = page.locator('.cl-userButtonPopoverCard');
      
      await expect(popover.locator('.cl-avatarImage')).toBeVisible();
      await expect(popover.locator('.cl-userPreviewMainIdentifierText')).toBeVisible();
      await expect(popover.locator('.cl-userPreviewSecondaryIdentifier')).toBeVisible();
    });

    test('should display menu options', async ({ page }) => {
      await page.locator('button[aria-label="Open user button"]').click();
      
      const popover = page.locator('.cl-userButtonPopoverCard');
      
      await expect(popover.locator('button[role="menuitem"]').filter({ hasText: 'Manage account' })).toBeVisible();
      await expect(popover.locator('button[role="menuitem"]').filter({ hasText: 'Sign out' })).toBeVisible();
    });

  });

  test.describe('Account Management', () => {
    
    test('should open account modal', async ({ page }) => {
      await page.locator('button[aria-label="Open user button"]').click();
      await page.locator('button[role="menuitem"]').filter({ hasText: 'Manage account' }).click();
      
      const modal = page.locator('.cl-cardBox');
      await expect(modal).toBeVisible();
      await expect(modal.locator('h1').filter({ hasText: 'Account' })).toBeVisible();
    });

    test('should display profile information', async ({ page }) => {
      await page.locator('button[aria-label="Open user button"]').click();
      await page.locator('button[role="menuitem"]').filter({ hasText: 'Manage account' }).click();
      
      const modal = page.locator('.cl-cardBox');
      
      await expect(modal.locator('.cl-avatarImage')).toBeVisible();
      await expect(modal.locator('.cl-userPreviewMainIdentifierText')).toBeVisible();
      await expect(modal.locator('button').filter({ hasText: 'Update profile' })).toBeVisible();
    });

    test('should show connected accounts', async ({ page }) => {
      await page.locator('button[aria-label="Open user button"]').click();
      await page.locator('button[role="menuitem"]').filter({ hasText: 'Manage account' }).click();
      
      const modal = page.locator('.cl-cardBox');
      
      await expect(modal.locator('text=Connected accounts')).toBeVisible();
      await expect(modal.locator('img[alt="Google"]')).toBeVisible();
      await expect(modal.locator('p').filter({ hasText: 'Google' })).toBeVisible();
    });

  });

  test.describe('Sign Out', () => {
    
    test('should sign out user', async ({ page }) => {
      await page.route('**/v1/client/sessions/**', async route => {
        if (route.request().method() === 'DELETE') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: true })
          });
        }
      });

      await page.locator('button[aria-label="Open user button"]').click();
      await page.locator('button[role="menuitem"]').filter({ hasText: 'Sign out' }).click();
      
      await expect(page).toHaveURL(/sign-in/, { timeout: 5000 });
    });

  });

});
