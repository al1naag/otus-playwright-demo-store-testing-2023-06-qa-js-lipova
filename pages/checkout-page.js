import BasePage from "./base-page";
import {expect} from "@playwright/test";

class CheckoutPage extends BasePage {

    constructor(page) {
        super(page);
        this._checkoutAsGuestBtn = '//button[normalize-space()="Checkout as Guest"]';
        this._billingSaveBtn = '//button[@onclick="Billing.save()"]';
        this._shippingMethodSaveBtn = '//button[@onclick="ShippingMethod.save()"]';
        this._paymentMethodSaveBtn = '//button[@onclick="PaymentMethod.save()"]';
        this._paymentInfoSaveBtn = '//button[@onclick="PaymentInfo.save()"]';
        this._inputFirstName = '#BillingNewAddress_FirstName';
        this._inputLastName = '#BillingNewAddress_LastName';
        this._inputEmail = '#BillingNewAddress_Email';
        this._inputCompany = '#BillingNewAddress_Company';
        this._selectCountry = '#BillingNewAddress_CountryId';
        this._selectState = '#BillingNewAddress_StateProvinceId';
        this._selectCity = '#BillingNewAddress_City';
        this._inputAddress1 = '#BillingNewAddress_Address1';
        this._inputAddress2 = '#BillingNewAddress_Address2';
        this._inputZip = '#BillingNewAddress_ZipPostalCode';
        this._inputPhone = '#BillingNewAddress_PhoneNumber';
        this._inputFax = '#BillingNewAddress_FaxNumber';
        this._inputCardholderName = '#CardholderName';
        this._inputCardNumber = '#CardNumber';
        this._inputCardCode = '#CardCode';
        this._selectCardType = '//select[@id="CreditCardType"]';
        this._selectExpireMonth = '//select[@id="ExpireMonth"]';
        this._selectExpireYear = '//select[@id="ExpireYear"]';
        this._billingInfo = '//div[@class="billing-info"]';
        this._shippingInfo = '//div[@class="shipping-info"]';
}

    async openCheckoutAsGuest() {
        await this.page.locator(this._checkoutAsGuestBtn).click();
        await this.page.waitForLoadState('networkidle');
    }

    async fillBillingAddress( {user} ) {
        await this.page.locator(this._inputFirstName).fill(user.firstName);
        await this.page.locator(this._inputLastName).fill(user.lastName);
        await this.page.locator(this._inputEmail).fill(user.email);
        await this.page.locator(this._inputCompany).fill(user.companyName);
        await this.page.locator(this._selectCountry).selectOption(user.country);
        await this.page.locator(this._selectState).selectOption(user.state);
        await this.page.locator(this._selectCity).fill(user.city);
        await this.page.locator(this._inputAddress1).fill(user.streetAddress);
        await this.page.locator(this._inputAddress2).fill(user.streetAddress);
        await this.page.locator(this._inputZip).type(user.zip);
        await this.page.locator(this._inputPhone).type(user.phone);
        await this.page.locator(this._inputFax).type(user.phone);
    }

    async fillPaymentInformation( {user} ) {
        await this.page.locator(this._selectCardType).selectOption(user.cardType);
        await this.page.locator(this._inputCardholderName).fill(`${user.firstName} ${user.lastName}`);
        await this.page.locator(this._inputCardNumber).fill(user.creditCardNumber);
        await this.page.locator(this._selectExpireMonth).selectOption(user.cardExpMonth);
        await this.page.locator(this._selectExpireYear).selectOption(user.cardExpYear);
        await this.page.locator(this._inputCardCode).fill(user.creditCardCVV);
    }

    async checkBillingInfo( {user} ) {
        await expect(this.page.locator(`${this._billingInfo}//li[@class='name'][normalize-space()='${user.firstName} ${user.lastName}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='email'][normalize-space()='Email: ${user.email}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='phone'][normalize-space()='Phone: ${user.phone}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='fax'][normalize-space()='Fax: ${user.phone}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='company'][normalize-space()='${user.companyName}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='address1'][normalize-space()='${user.streetAddress}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='address2'][normalize-space()='${user.streetAddress}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='city-state-zip'][normalize-space()='${user.city},${user.state},${user.zip}']`)).toBeVisible();
        await expect(this.page.locator(`${this._billingInfo}//li[@class='country'][normalize-space()='${user.country}']`)).toBeVisible();
    }

    async checkShippingAddress( {user} ) {
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='name'][normalize-space()='${user.firstName} ${user.lastName}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='email'][normalize-space()='Email: ${user.email}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='phone'][normalize-space()='Phone: ${user.phone}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='fax'][normalize-space()='Fax: ${user.phone}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='company'][normalize-space()='${user.companyName}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='address1'][normalize-space()='${user.streetAddress}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='address2'][normalize-space()='${user.streetAddress}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='city-state-zip'][normalize-space()='${user.city},${user.state},${user.zip}']`)).toBeVisible();
        await expect(this.page.locator(`${this._shippingInfo}//li[@class='country'][normalize-space()='${user.country}']`)).toBeVisible();
       }

    async checkProductInCheckout(productTitle, productPrice, quantity) {
        const priceWithoutDollarSign = parseInt(productPrice.replace(/\$/g, ''),10);
        const expectedSubtotal = (priceWithoutDollarSign * quantity).toFixed(2);
        const expectedTotal = (priceWithoutDollarSign * quantity).toFixed(2);
        await expect(this.page.locator(`//tbody[.//a[contains(text(), '${productTitle}')]]`)).toBeVisible();
        await expect(this.page.locator(`//span[@class='product-unit-price'][text()='${productPrice}']`)).toBeVisible();
        await expect(this.page.locator(`//span[@class='product-subtotal'][text()='$${expectedSubtotal}']`)).toBeVisible();
        expect(await this.page.locator('//span[@class="product-quantity"]').textContent()).toBe('1');
        await expect(this.page.locator(`//tr[@class='order-subtotal']//span[@class='value-summary'][text()='$${expectedSubtotal}']`)).toBeVisible();
        await expect(this.page.locator(`//tr[@class='order-total']//span[@class='value-summary'][strong='$${expectedTotal}']`)).toBeVisible();
    }


    async checkShippingMethod(shippingMethod ) {
        await expect(this.page.locator(`//span[normalize-space()='${shippingMethod}']`)).toBeVisible();
    }

    async checkPaymentMethod(paymentMethod ) {
        await expect(this.page.locator(`//span[normalize-space()='${paymentMethod}']`)).toBeVisible();
    }


    async selectShippingMethod(shippingMethod) {
         shippingMethod === 'Ground' ? await this.page.locator('//input[@id="shippingoption_0"]').click() : (shippingMethod === 'Next Day Air' ? await this.page.locator('//input[@id="shippingoption_1"]').click() : await this.page.locator('//input[@id="shippingoption_2"]').click());
    }

    async selectPaymentMethod(paymentMethod) {
        paymentMethod === 'Credit Card' ? await this.page.locator(`//input[@id='paymentmethod_1']`).click() : await this.page.locator(`//input[@id='paymentmethod_0']`).click();

    }

    async saveBillingForm() {
        await this.page.locator(this._billingSaveBtn).click();
    }

    async saveShippingMethod() {
        await this.page.locator(this._shippingMethodSaveBtn).click();
    }

    async savePaymentMethod() {
        await this.page.locator(this._paymentMethodSaveBtn).click();
    }

    async savePaymentInfo() {
        await this.page.locator(this._paymentInfoSaveBtn).click();
    }
}

export default CheckoutPage;
