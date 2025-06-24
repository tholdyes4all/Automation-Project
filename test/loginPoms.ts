import { test, expect, Browser, BrowserContext, chromium,type Page } from '@playwright/test';
import { login } from '../page/loginPage.spec';

    const browser: Browser = await chromium.launch ({ headless: false });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await browser.newPage();


// test case test login
test  ('Login with valid credentials', async ({ page }) => {
    await page.goto('https://portal.test.yes4all.com/');
    await login(page, 'thold@yes4all.com','Tho@123');
    await expect(page.getByText('Business Activities')).toBeVisible();
});

test.afterAll(async () => {
    await browser.close();
});