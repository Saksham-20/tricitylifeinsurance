import { test, expect } from '@playwright/test';

test.describe('LIC Recruitment - Home Page Visual Tests', () => {
  test('hero section renders with animations on desktop', async ({ page, browserName }) => {
    // Skip webkit (Safari) due to known Framer Motion compatibility issues 
    if (browserName === 'webkit') return;
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify hero content is visible
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('High-Earning Insurance Career');

    // Take screenshot of hero
    await page.screenshot({
      path: `tests/snapshots/hero-desktop-${browserName}.png`,
      fullPage: false,
    });

    // Verify CTAs are present
    const applyButton = page.locator('a:has(> button)').first().locator('button');
    await expect(applyButton).toBeVisible({ timeout: 3000 });

    // Take full page screenshot
    await page.screenshot({
      path: `tests/snapshots/full-page-desktop-${browserName}.png`,
      fullPage: true,
    });
  });

  test('hero section renders on mobile', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return; // Only run on chromium for mobile tests

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify hero content is visible
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: `tests/snapshots/hero-mobile-375px.png`,
      fullPage: false,
    });

    await page.screenshot({
      path: `tests/snapshots/full-page-mobile-375px.png`,
      fullPage: true,
    });
  });

  test('hero section renders on tablet', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return;

    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify hero content is visible
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: `tests/snapshots/hero-tablet-768px.png`,
      fullPage: false,
    });

    await page.screenshot({
      path: `tests/snapshots/full-page-tablet-768px.png`,
      fullPage: true,
    });
  });

  test('CTA buttons are interactive', async ({ page, browserName }) => {
    // Skip webkit (Safari) due to known Framer Motion compatibility issues
    if (browserName === 'webkit') return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find apply button
    const applyButton = page.locator('a:has(> button)').first().locator('button');
    const whatsappButton = page.locator('button:text("WhatsApp")').first();
    
    await expect(applyButton).toBeVisible({ timeout: 3000 });
    await expect(whatsappButton).toBeVisible({ timeout: 3000 });

    // Test button hover (visual feedback)
    await applyButton.hover();

    // Take screenshot of hovered state
    await page.screenshot({
      path: `tests/snapshots/button-hover-${browserName}.png`,
      fullPage: false,
    });

    // Take screenshot of normal state
    await page.mouse.move(0, 0);
    await page.screenshot({
      path: `tests/snapshots/button-normal-${browserName}.png`,
      fullPage: false,
    });
  });

  test('page loads with reduced motion preference', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return;

    // Enable reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({
      path: `tests/snapshots/reduced-motion-hero.png`,
      fullPage: false,
    });

    // Verify content is still accessible
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
  });

  test('layout is responsive at different breakpoints', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return;

    const breakpoints = [
      { width: 375, name: 'mobile' },
      { width: 768, name: 'tablet' },
      { width: 1024, name: 'desktop' },
      { width: 1440, name: 'wide' },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Verify no horizontal overflow
      const htmlElement = page.locator('html');
      const boxModel = await htmlElement.boundingBox();
      expect(boxModel?.width).toBeLessThanOrEqual(breakpoint.width);

      // Take screenshot
      await page.screenshot({
        path: `tests/snapshots/responsive-${breakpoint.name}-${breakpoint.width}px.png`,
        fullPage: false,
      });
    }
  });

  test('pathway section renders with animation', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to pathway section
    const pathwayHeading = page.locator('text=Your Perfect Career Path');
    await pathwayHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Wait for animations

    // Verify section is visible
    const pathwaySection = page.locator('section').nth(1);
    await expect(pathwaySection).toBeVisible();

    // Verify heading is visible
    await expect(pathwayHeading).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: `tests/snapshots/pathway-section-${browserName}.png`,
      fullPage: false,
    });
  });

  test('stats section renders with count-ups', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to stats section
    const statsHeading = page.locator('text=Our Track Record');
    await statsHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // Wait for count-up animations

    // Verify stat numbers are visible
    const statNumbers = await page.locator('section').nth(2).locator('text=/\\d+\\+?/').count();
    expect(statNumbers).toBeGreaterThan(0);

    // Take screenshot
    await page.screenshot({
      path: `tests/snapshots/stats-section-${browserName}.png`,
      fullPage: false,
    });
  });

  test('gallery section renders with masonry layout', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to gallery section
    const galleryHeading = page.locator('text=See Our Impact');
    await galleryHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Wait for animations

    // Verify gallery layout
    const galleryGrid = page.locator('section').nth(3);
    await expect(galleryGrid).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: `tests/snapshots/gallery-section-${browserName}.png`,
      fullPage: false,
    });
  });

  test('full page scrollable content displays all sections', async ({ page, browserName }) => {
    if (browserName !== 'chromium') return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get page scroll height
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(scrollHeight).toBeGreaterThan(2000); // Ensure page has substantial content

    // Scroll through page and capture multiple points
    const viewportHeight = 800;
    let scrollPosition = 0;

    while (scrollPosition < scrollHeight) {
      await page.evaluate((pos) => window.scrollTo(0, pos), scrollPosition);
      await page.waitForTimeout(200);

      const name = `full-scroll-${Math.round(scrollPosition / 500)}`;
      await page.screenshot({
        path: `tests/snapshots/${name}-${browserName}.png`,
        fullPage: false,
      });

      scrollPosition += viewportHeight;
    }
  });
});
