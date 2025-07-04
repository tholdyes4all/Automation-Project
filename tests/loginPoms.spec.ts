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
        // Thu gọn lại menu
        await page.hover("//div[@aria-label='Homepage']//div[@class='MuiListItemIcon-root mui-8rvncq']//*[name()='svg']", { timeout: 10000 });
        await page.waitForSelector("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium button-collapse mui-110669n']//*[name()='svg']", { timeout: 10000 });
        await page.click("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium button-collapse mui-110669n']//*[name()='svg']", { timeout: 10000 });

        // Kiểm tra các mục menu
        await expect(page.locator("//div[@aria-label='Task management']//div[@role='button']")).toBeVisible();
        await expect(page.locator("//div[@aria-label='Product center']//div[@role='button']")).toBeVisible();   
        await expect(page.locator("//div[@aria-label='Commercial']//div[@role='button']")).toBeVisible();
        await expect(page.locator("//div[@aria-label='Operation']//div[@role='button']")).toBeVisible();
        await expect(page.locator("//div[@aria-label='Master Data']//div[@role='button']")).toBeVisible();
        });

test.afterEach(async () => {
  await context.close(); // Tự đóng context & browser

});
});

