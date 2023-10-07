import { expect } from "@playwright/test";

class RegisterResultPage {
    constructor(page) {
        this.page = page;
        this._registerCompleteText = 'Your registration completed';
    }

    async verifyRegistration() {
        await expect(this.page.locator(`//div[contains(text(),'${this._registerCompleteText}')]`)).toBeVisible();
    }
}

export default RegisterResultPage;
