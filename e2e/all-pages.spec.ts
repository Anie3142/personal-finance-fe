import { test, expect } from '@playwright/test';

/**
 * NairaTrack E2E Tests
 * Tests both public pages and API endpoints
 * Note: Protected pages require authentication and will redirect to login
 */

// Public pages (no auth required)
const publicPages = [
  { path: '/', title: 'Landing', selector: 'text=NairaTrack' },
  { path: '/pricing', title: 'Pricing', selector: 'text=Simple, Transparent Pricing' },
];

// Protected pages (require auth - tests verify redirect works)
const protectedPages = [
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/accounts', title: 'Accounts' },
  { path: '/transactions', title: 'Transactions' },
  { path: '/budgets', title: 'Budgets' },
  { path: '/goals', title: 'Goals' },
  { path: '/recurring', title: 'Recurring' },
  { path: '/reports', title: 'Reports' },
  { path: '/insights', title: 'Insights' },
  { path: '/categories', title: 'Categories' },
  { path: '/settings', title: 'Settings' },
  { path: '/export', title: 'Export' },
];

test.describe('NairaTrack - Public Pages', () => {
  for (const page of publicPages) {
    test(`${page.title} page loads correctly`, async ({ page: browserPage }) => {
      const response = await browserPage.goto(page.path);
      
      // Check page returns 200
      expect(response?.status()).toBe(200);
      
      // Wait for page to load
      await browserPage.waitForLoadState('domcontentloaded');
      
      // Check for expected content
      await expect(browserPage.locator(page.selector).first()).toBeVisible({ timeout: 10000 });
    });
  }
});

test.describe('NairaTrack - Landing Page Links', () => {
  test('landing page has all navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Check header links (use first() to avoid strict mode with multiple matches)
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'How It Works' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pricing' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Demo' })).toBeVisible();
    
    // Check auth buttons (use exact match to avoid multiple elements)
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get Started', exact: true })).toBeVisible();
  });
  
  test('pricing link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.click('a:has-text("Pricing")');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL(/.*pricing/);
    await expect(page.locator('text=Simple, Transparent Pricing')).toBeVisible();
  });
  
  test('features anchor works', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await page.click('a:has-text("Features")');
    
    // Should scroll to features section (URL will have #features)
    await expect(page).toHaveURL(/.*#features/);
  });
});

test.describe('NairaTrack - Pricing Page', () => {
  test('pricing page shows all plans', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');
    
    // Check all pricing plans are visible (use headings to be specific)
    await expect(page.getByRole('heading', { name: 'Free' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Premium' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Family' })).toBeVisible();
    
    // Check prices exist on page
    await expect(page.locator('text=₦0').first()).toBeVisible();
    await expect(page.locator('text=₦1,500').first()).toBeVisible();
    await expect(page.locator('text=₦3,000').first()).toBeVisible();
  });
  
  test('pricing page has FAQ section', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
    await expect(page.locator('text=Can I change plans anytime?')).toBeVisible();
  });
  
  test('back to home link works', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('domcontentloaded');
    
    // Click logo to go back
    await page.click('a:has-text("NairaTrack")');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page).toHaveURL('/');
  });
});

test.describe('NairaTrack - Protected Routes Redirect', () => {
  for (const page of protectedPages) {
    test(`${page.title} redirects to login when not authenticated`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      
      // Should redirect to Auth0 login
      await browserPage.waitForURL(/.*auth0\.com|.*api\/auth\/login/, { timeout: 15000 });
      
      // URL should contain auth0 or api/auth/login
      const url = browserPage.url();
      expect(url.includes('auth0.com') || url.includes('api/auth/login')).toBeTruthy();
    });
  }
});

test.describe('NairaTrack - API Health Check', () => {
  test('backend health endpoint responds', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/v1/health');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.status).toBe('healthy');
  });
  
  test('accounts API endpoint responds', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/v1/accounts');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('accounts');
  });
  
  test('categories API endpoint responds', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/v1/categories');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('categories');
  });
  
  test('transactions API endpoint responds', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/v1/transactions');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('transactions');
  });
  
  test('budgets API endpoint responds', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/v1/budgets');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('budgets');
  });
  
  test('goals API endpoint responds', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/v1/goals');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('goals');
  });
});

test.describe('NairaTrack - 404 Page', () => {
  test('non-existent page returns 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    
    // Should be 404
    expect(response?.status()).toBe(404);
    
    // Should show not found message
    await expect(page.locator('text=not found')).toBeVisible({ timeout: 5000 });
  });
});
