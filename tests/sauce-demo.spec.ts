import { test, expect } from '../fixtures/page-fixtures';
import { UserRole } from '../constants/user-roles';

test.describe('Login Tests', { tag: '@smoke' }, () => {
  test('should login with valid credentials', async ({
    loginPage,
    page 
  }) => {
    
    await loginPage.open();
    await loginPage.loginAs(UserRole.Standard);
    
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});