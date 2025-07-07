import { test, expect, chromium, BrowserContext, Page } from '@playwright/test';
import { login } from '../page/homePage';

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

  test('check login success', async () => {
    await expect(page.getByText('Business Activities')).toBeVisible();
  });

  test('check left menu', async () => {
    // Mở menu trái
    await page.hover("//div[@aria-label='Homepage']//div[@class='MuiListItemIcon-root mui-8rvncq']//*[name()='svg']");
    await page.waitForSelector("//button[contains(@class,'button-collapse')]//*[name()='svg']", { timeout: 10000 });
    await page.click("//button[contains(@class,'button-collapse')]//*[name()='svg']");

    // Kiểm tra hiển thị các mục
    const menus = [
      'Task management',
      'Product center',
      'Commercial',
      'Operation',
      'Master Data'
    ];
    for (const menu of menus) {
      await expect(page.locator(`//div[@aria-label='${menu}']//div[@role='button']`)).toBeVisible();
    }

    // Mở tab mới: Task Management
    const [pageTaskmanagement] = await Promise.all([
      context.waitForEvent('page'),
      page.locator("//div[@aria-label='Task management']//div[@role='button']").click()
    ]);
    await pageTaskmanagement.waitForLoadState();
    await expect(pageTaskmanagement).toHaveURL(/int-task\.yes4all\.com/);
    await pageTaskmanagement.close();

    // Mở tab mới: Product Center
    const [pageProductcenter] = await Promise.all([
      context.waitForEvent('page'),
      page.locator("//div[@aria-label='Product center']//div[@role='button']").click()
    ]);
    await pageProductcenter.waitForLoadState();
    await expect(pageProductcenter).toHaveURL(/int-product\.yes4all\.com/);
    await pageProductcenter.close();

   
        await page.hover("//div[@aria-label='Commercial']//div[@role='button']");
        await page.locator("//div[@aria-label='Commercial']//div[@role='button']").click()
    
        const CatalogXpath = "xpath=//div[@class='MuiBox-root mui-0']//div[1]//div[1]//div[1]//*[name()='svg']//*[name()='g' and contains(@clip-path,'url(#clip0')]//*[name()='g' and contains(@clip-path,'url(#clip1')]//*[name()='path' and contains(@d,'M14.5329 1')]";
        await page.waitForSelector(CatalogXpath, { timeout: 10000 });
        await page.locator(CatalogXpath).hover();
        const [pageCatalog] = await Promise.all([
        context.waitForEvent('page'),
            page.locator(CatalogXpath).click()
        ]);
        await pageCatalog.waitForLoadState();
        await expect(pageCatalog).toHaveURL(/int-catalog\.yes4all\.com/);
        await pageCatalog.close();

        //click menu Commercial
        await page.hover("//div[@aria-label='Commercial']//div[@role='button']");
        await page.locator("//div[@aria-label='Commercial']//div[@role='button']").click()

        const requestChangeSelector = "div#sub-menu div:nth-child(2) div:nth-child(1) div:nth-child(1) svg";
        await page.waitForSelector(requestChangeSelector, { timeout: 10000 });
        await page.locator(requestChangeSelector).hover();
        const [pageRequestchange] = await Promise.all([
        context.waitForEvent('page'),
            page.locator(requestChangeSelector).click()
        ]);
        await pageRequestchange.waitForLoadState();
        await expect(pageRequestchange).toHaveURL(/int-request\.yes4all\.com/);
        await pageRequestchange.close();
  });

  test.afterEach(async () => {
    await context.close();
  });
});
