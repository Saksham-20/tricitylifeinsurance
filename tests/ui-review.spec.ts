import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '../playwright-report/ui-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 375, height: 667 },
];

const PAGES = [
  { route: '/', name: 'home' },
  { route: '/about', name: 'about' },
  { route: '/training', name: 'training' },
  { route: '/apply', name: 'apply' },
  { route: '/bima-sakhi', name: 'bima-sakhi' },
  { route: '/contact', name: 'contact' },
];

test.describe('UI Design Review - All Pages, All Breakpoints', () => {
  PAGES.forEach((page) => {
    VIEWPORTS.forEach((viewport) => {
      test(`[${viewport.name}] ${page.name} page - full page screenshot`, async ({
        page: browserPage,
      }) => {
        // Set viewport size
        await browserPage.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });

        // Navigate to page
        await browserPage.goto(page.route);
        await browserPage.waitForLoadState('networkidle');

        // Wait for animations to settle (Framer Motion)
        await browserPage.waitForTimeout(1500);

        // Take full page screenshot
        const filename = `${page.name}-${viewport.name}-${viewport.width}px.png`;
        await browserPage.screenshot({
          path: path.join(screenshotsDir, filename),
          fullPage: true,
        });

        console.log(`✓ Captured: ${filename}`);
      });
    });
  });
});
