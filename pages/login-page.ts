import { expect, type Locator, type Page } from '@playwright/test';
import users from '../test-data/users.json';
import { UserRole } from '../constants/user-roles';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async open() {
        await this.page.goto('/');
        await expect(this.usernameInput).toBeVisible();
    }

    async setUsernameInput(username: string) {
        await this.usernameInput.fill(username);
    }

    async setPasswordInput(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginAs(role: UserRole) {
        const user = users.find(u => u.role === role);
        if (!user) {
            throw new Error(`No user with role '${role}' found in users.json`);
        }

        await this.setUsernameInput(user.username);
        await this.setPasswordInput(user.password);
        await this.clickLoginButton();
    }
}