import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import users from '../test-data/users.json';
import { UserRole } from '../constants/user-roles';

test('should login with valid credentials', { tag: '@smoke'}, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToUrl('/');

  const standardUser = users.find(u => u.role === 'standard_user')!;

  await loginPage.setUsernameInput(standardUser.username);
  await loginPage.setPasswordInput(standardUser.password);
  await loginPage.clickLoginButton();

  // Add assertions to verify successful login, e.g., checking for a specific element on the home page
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('should login', { tag: '@smoke' }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(UserRole.Standard);

  await expect(page).toHaveURL(/.*inventory.html/);
});