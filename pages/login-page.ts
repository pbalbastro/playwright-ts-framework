import { expect, type Locator, type Page } from '@playwright/test';
import users from '../test-data/users.json';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async open() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
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

    async login(role: string) {
        const user = users.find(u => u.role === role);
        if (!user) {
            throw new Error(`No user with role '${role}' found in users.json`);
        }

        await this.setUsernameInput(user.username);
        await this.setPasswordInput(user.password);
        await this.clickLoginButton();
    }
}