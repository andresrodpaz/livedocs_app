import { test, expect } from '@playwright/test';
import { AuthMocks, AuthAssertions } from '../helpers/auth_helpers.js';

test.describe('Live Docs - Authentication Tests', () => {
  
  test.beforeEach(async ({ page }) => {
   //await page.goto('/sign-in');
   await page.goto('http://localhost:3000/sign-in');
 
   await page.waitForLoadState('networkidle');
  });

  test.describe('Sign In Page', () => {
    
    test('should display all sign in elements', async ({ page }) => {
      await expect(page.locator('img[alt="Live Docs"]')).toBeVisible();
      await expect(page.locator('h1')).toContainText('Sign in to Live Docs');
      await expect(page.locator('button').filter({ hasText: 'Continue with Google' })).toBeVisible();
      await expect(page.locator('a').filter({ hasText: 'Sign up' })).toBeVisible();
    });

    test('should authenticate user with Google OAuth', async ({ page }) => {
      await AuthMocks.mockSuccessfulGoogleAuth(page, '/');
      
      const googleButton = page.locator('button').filter({ hasText: 'Continue with Google' });
      await googleButton.click();
      
      await AuthAssertions.expectSuccessfulLogin(page, '/');
    });

    test('should handle authentication errors', async ({ page }) => {
      await AuthMocks.mockAuthError(page);
      
      const googleButton = page.locator('button').filter({ hasText: 'Continue with Google' });
      await googleButton.click();
      
      await AuthAssertions.expectAuthError(page);
    });

  });

  test.describe('Sign Up Page', () => {
    
    test('should navigate to sign up and register user', async ({ page }) => {
      await page.goto('http://localhost:3000/sign-up');
      
      await expect(page.locator('h1')).toContainText('Create your account');
      
      await AuthMocks.mockSuccessfulGoogleSignup(page, '/');
      
      const googleButton = page.locator('button').filter({ hasText: 'Continue with Google' });
      await googleButton.click();
      
      await AuthAssertions.expectSuccessfulLogin(page, '/');
    });

  });

});
