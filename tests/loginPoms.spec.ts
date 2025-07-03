import { test, expect, Browser, BrowserContext, chromium,type Page } from '@playwright/test';
import { login } from '../page/homePage';


// khoi tao trinh duyet
let context: BrowserContext;
let page: Page;

test.describe('Login Tests', () => {
    test.beforeEach(async () => {
    const browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
        await page.goto('https://portal.test.yes4all.com/');
        await login(page, 'thold@yes4all.com', 'Tho@123');
    });
        //kiem tra login thanh cong
        test('check login success', async () => {
        await expect(page.getByText('Business Activities')).toBeVisible();
        });
        //kiểm tra menu 
        test('check left menu', async () => {
        await page.locator("//div[@role='button'][.//span[text()='Task management']]").hover();
        const buttonCollapse = page.locator("button:has(svg[data-testid='ArrowForwardIosRoundedIcon'])");
            await buttonCollapse.waitFor({ state: 'visible', timeout: 5000 });
            await buttonCollapse.scrollIntoViewIfNeeded();
            await buttonCollapse.dblclick();
        });

test.afterEach(async () => {
  await context.close(); // Tự đóng context & browser

});
});

