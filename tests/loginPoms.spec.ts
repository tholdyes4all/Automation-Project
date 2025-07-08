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
    // Open left menu
    await page.hover("//div[@aria-label='Homepage']//div[@class='MuiListItemIcon-root mui-8rvncq']//*[name()='svg']");
    await page.waitForSelector("//button[contains(@class,'button-collapse')]//*[name()='svg']", { timeout: 10000 });
    await page.click("//button[contains(@class,'button-collapse')]//*[name()='svg']");

    // Check menu items
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

    // Helper to open menu and check new tab
    async function openMenuAndCheckNewTab(
      menuLabel: string,
      buttonSelector: string,
      expectedUrl: RegExp
    ) {
      await page.hover(buttonSelector);
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator(buttonSelector).click()
      ]);
      await newPage.waitForLoadState();
      await expect(newPage).toHaveURL(expectedUrl);
      await newPage.close();
    }

    // Task Management
    await openMenuAndCheckNewTab(
      'Task management',
      "//div[@aria-label='Task management']//div[@role='button']",
      /int-task\.yes4all\.com/
    );

    // Product Center
    await openMenuAndCheckNewTab(
      'Product center',
      "//div[@aria-label='Product center']//div[@role='button']",
      /int-product\.yes4all\.com/
    );

    // Commercial submenus
    const commercialButton = "//div[@aria-label='Commercial']//div[@role='button']";
    const commercialSubMenus = [
      {
        selector: "xpath=//div[@class='MuiBox-root mui-0']//div[1]//div[1]//div[1]//*[name()='svg']//*[name()='g' and contains(@clip-path,'url(#clip0')]//*[name()='g' and contains(@clip-path,'url(#clip1')]//*[name()='path' and contains(@d,'M14.5329 1')]",
        url: /int-catalog\.yes4all\.com/
      },
      {
        selector: "div#sub-menu div:nth-child(2) div:nth-child(1) div:nth-child(1) svg",
        url: /int-request\.yes4all\.com/
      },
      {
        selector: "div#sub-menu div:nth-child(3) div:nth-child(1) div:nth-child(1) svg",
        url: /ads\.test\.yes4all\.com/
      },
      {
        selector: "div#sub-menu div:nth-child(4) div:nth-child(1) div:nth-child(1) svg",
        url: /int-promotion\.yes4all\.com/
      },
      {
        selector: "div#sub-menu div:nth-child(5) div:nth-child(1) div:nth-child(1) svg",
        url: /int-rival-scan\.yes4all\.com/
      }
    ];

    for (const { selector, url } of commercialSubMenus) {
      await page.hover(commercialButton);
      await page.locator(commercialButton).click();
      await page.waitForSelector(selector, { timeout: 10000 });
      await page.locator(selector).hover();
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator(selector).first().click()
      ]);
      await newPage.waitForLoadState();
      await expect(newPage).toHaveURL(url);
      await newPage.close();
    }
  });

  test.afterEach(async () => {
    await context.close();
  });
});
