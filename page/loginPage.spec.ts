import { test, expect, Browser, BrowserContext, chromium,type Page } from '@playwright/test';

// khai bao ham login
export const login = async (page: Page, email: string, password: string) => {  
  await page.getByLabel('username').fill(email);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
}
