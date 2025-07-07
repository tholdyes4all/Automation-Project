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

        // Hover vào element cha (ví dụ: div hoặc button cha của nút cần click)
         await page.hover("//div[@aria-label='Homepage']//div[@class='MuiListItemIcon-root mui-8rvncq']//*[name()='svg']", { timeout: 10000 });

         // Chờ icon svg xuất hiện rồi click
        await page.waitForSelector("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium button-collapse mui-yla0qo']//*[name()='svg']", { timeout: 10000 });
        await page.click("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium button-collapse mui-yla0qo']//*[name()='svg']", { timeout: 10000 });

        // Kiểm tra các mục menu
        await expect(page.locator("//div[@aria-label='Task management']//div[@role='button']")).toBeVisible();
        await expect(page.locator("//div[@aria-label='Product center']//div[@role='button']")).toBeVisible();   
        await expect(page.locator("//div[@aria-label='Commercial']//div[@role='button']")).toBeVisible();
        await expect(page.locator("//div[@aria-label='Operation']//div[@role='button']")).toBeVisible();
        await expect(page.locator("//div[@aria-label='Master Data']//div[@role='button']")).toBeVisible();
        
        //kiem tra click open new page task management

        const [pageTaskmanagement] = await Promise.all([
            context.waitForEvent('page'),
            page.locator("//div[@aria-label='Task management']//div[@role='button']").click()
        ]);
        await pageTaskmanagement.waitForLoadState(); 
        await expect(pageTaskmanagement).toHaveURL(/int-task\.yes4all\.com/); 
        await pageTaskmanagement.close()
        //kiểm tra click open new page product center '
        const [pageProductcenter] = await Promise.all([
            context.waitForEvent('page'),
            page.locator("//div[@aria-label='Product center']//div[@role='button']").click()
        ]);
        await pageProductcenter.waitForLoadState(); 
        await expect(pageProductcenter).toHaveURL(/int-product\.yes4all\.com/);
        await pageProductcenter.close()
        });

});

test.afterEach(async () => {
  await context.close(); // Tự đóng context & browser
});

