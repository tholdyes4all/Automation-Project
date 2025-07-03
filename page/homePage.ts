import { Page } from "@playwright/test";

// hàm login vào trang web
export const login = async (page: Page, email: string, password: string) => {
  await page.fill('input[name="username"]', email);  
  await page.fill('input[name="password"]', password);
  await page.click('input[name="login"]');
  await page.waitForLoadState('networkidle');
};
 