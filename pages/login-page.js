import HomePage from "../pages/home-page";
import BasePage from "./base-page";
import {expect} from "@playwright/test";

class LoginPage extends BasePage {

    constructor(page) {
        super(page);
        this._inputEmail = page.locator('#Email');
        this._inputPassword = page.locator('#Password');
        this._loginBtn = page.locator('//button[normalize-space()="Log in"]');
    }

    async open() {
        await this.page.goto('/login');
    }

    async fillLoginForm( email, password ) {
        await this._inputEmail.fill(email);
        await this._inputPassword.fill(password);
    }

    async clickLoginBtn() {
        await this._loginBtn.click();
        await expect(this.page.url()).toMatch('/');
        return new HomePage(this.page);
    }

    async verifySuccessfulLogIn() {
        await expect(this.page.locator('//a[@class="ico-account"]')).toBeVisible();
    }

    async verifyUnsuccessfulLogIn() {
        await expect(this.page.locator('//div[contains(text(), "Login was unsuccessful. Please correct the errors and try again.")]')).toBeVisible();
    }

    async verifyEmailNotProvidedError() {
        await expect(this.page.locator('//span[contains(text(), "Please enter your email")]')).toBeVisible();
    }

    async login( {user}) {
        await this.open();
        await this.fillLoginForm(user.email,user.password);
        await this.clickLoginBtn();
        await expect(this.page.url()).toMatch('/');
        return new HomePage(this.page);
    }

}

export default LoginPage;
