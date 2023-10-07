import RegisterResultPage from "../pages/register-result-page";
import BasePage from "./base-page";

class RegisterPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this._inputFirstName = page.locator('#FirstName');
        this._inputLastName = page.locator('#LastName');
        this._inputEmail = page.locator('#Email');
        this._inputPassword = page.locator('#Password');
        this._inputConfirmPassword = page.locator('#ConfirmPassword');
        this._inputCompany = page.locator('#Company');
        this._checkBoxNewsletter = page.locator('#Newsletter');
        this._genderMaleRadioBtn = page.locator('#gender-male');
        this._genderFemaleRadioBtn = page.locator('#gender-female');
        this._selectDateOfBirthDay = page.locator('//select[@name="DateOfBirthDay"]');
        this._selectDateOfBirthMonth = page.locator('//select[@name="DateOfBirthMonth"]');
        this._selectDateOfBirthYear = page.locator('//select[@name="DateOfBirthYear"]');
        this._registerBtn = page.locator('#register-button');
    }

    async open() {
        await this.page.goto('/register');
    }

    async fillPersonalDetailsForm( {user} ) {
        await this._inputFirstName.fill(user.firstName);
        await this._inputLastName.fill(user.lastName);
        await this._selectDateOfBirthDay.selectOption(user.birthDay);
        await this._selectDateOfBirthMonth.selectOption(user.birthMonth);
        await this._selectDateOfBirthYear.selectOption(user.birthYear);
        await this._inputEmail.fill(user.email);
    }

    async fillCompanyDetailsForm( {user} ) {
        await this._inputCompany.fill(user.companyName);
    }

    async selectGender(gender ) {
        gender === 'male' ? await  this._genderMaleRadioBtn.click() : await this._genderFemaleRadioBtn.click();
    }

    async fillPasswordForm( {user} ) {
        await this._inputPassword.fill(user.password);
        await this._inputConfirmPassword.fill(user.password);
    }

    async subscribeNewsletters() {
        await this._checkBoxNewsletter.check();
    }

    async clickRegisterBtn() {
        await this._registerBtn.click();
        await this.page.waitForLoadState('networkidle');
        return new RegisterResultPage(this.page);
    }

    async registerNewUser({user}) {
        await this.open();
        await this.selectGender('male');
        await this.fillPersonalDetailsForm({user});
        await this.fillCompanyDetailsForm({user});
        await this.fillPasswordForm({user});
        await this.subscribeNewsletters();
        await this.clickRegisterBtn();
        return new RegisterResultPage(this.page);
    }

}

export default RegisterPage;
