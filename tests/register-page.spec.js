import { test } from '@playwright/test';
import userFixture from "../fixtures/userFixture.js";

import RegisterPage from '../pages/register-page';
const { user  } = userFixture;

test('Register New User Account', async ({page}) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.selectGender('male');
    await registerPage.fillPersonalDetailsForm({user});
    await registerPage.fillCompanyDetailsForm({user});
    await registerPage.fillPasswordForm({user});
    await registerPage.subscribeNewsletters();
    const registerResultPage = await registerPage.clickRegisterBtn();
    await registerResultPage.verifyRegistration();
});


