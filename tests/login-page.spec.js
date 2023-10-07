import { test } from '@playwright/test';
import config from "../config/config.js";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
const { user, fakeUser  } = config;

test('Login User with correct email and password', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await registerPage.registerNewUser({user})
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm(user.email, user.password);
    await loginPage.clickLoginBtn();
    await loginPage.verifySuccessfulLogIn();
});

test('Login User with correct email and wrong password', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await registerPage.registerNewUser({user})
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm(user.email, fakeUser.fakePassword);
    await loginPage.clickLoginBtn();
    await loginPage.verifyUnsuccessfulLogIn();
});

test('Login User with wrong email and correct password', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await registerPage.registerNewUser({user})
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm(fakeUser.fakeEmail, user.password);
    await loginPage.clickLoginBtn();
    await loginPage.verifyUnsuccessfulLogIn();
});

test('Login User with empty email and password', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm('', '');
    await loginPage.clickLoginBtn();
    await loginPage.verifyEmailNotProvidedError()
});


