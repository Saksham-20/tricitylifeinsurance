import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Check if sections exist
  const pathwaySection = await page.locator('section').nth(1);
  const statsSection = await page.locator('section').nth(2);
  const gallerySection = await page.locator('section').nth(3);
  
  console.log('Section 0 (Hero):', await page.locator('section').nth(0).isVisible());
  console.log('Section 1 (Pathway):', await pathwaySection.isVisible());
  console.log('Section 2 (Stats):', await statsSection.isVisible());
  console.log('Section 3 (Gallery):', await gallerySection.isVisible());
  
  // Count total sections
  const totalSections = await page.locator('section').count();
  console.log('Total sections found:', totalSections);
  
  // Get page scroll height
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Page scroll height:', scrollHeight);
  
  // Try scrolling and check visibility
  await page.evaluate(() => window.scrollBy(0, 1000));
  console.log('After scroll 1000px - Section 1 visible:', await pathwaySection.isVisible());
  
} catch (err) {
  console.error('Error:', err.message);
} finally {
  await browser.close();
}
