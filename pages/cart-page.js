import BasePage from "./base-page";
import CheckoutPage from "./checkout-page";
import {expect} from "@playwright/test";

class CartPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this._emptyCartText = '//div[contains(text(),"Your Shopping Cart is empty!")]';
        this._inputQuantity = '.qty-input';
        this._updateCartBtn = '//button[@id="updatecart"]';
        this._checkoutBtn = '#checkout';
        this._termsofservice = '#termsofservice';
        this._continueShoppingBtn ='//button[normalize-space()="Continue shopping"]';
        this._estimateShippingBtn ='//a[normalize-space()="Estimate shipping"]';
        this._applyBtn ='//button[normalize-space()="Apply"]';
        this._selectCountry = '#CountryId';
        this._selectState = '#StateProvinceId';
        this._selectZip = '#ZipPostalCode';
        this._selectGiftWrapping = '#checkout_attribute_1';
    }

    async open() {
        await this.page.goto('/cart');
    }

    async checkProductInCart(productTitle, productPrice, quantity) {
        const priceWithoutDollarSign = parseInt(productPrice.replace(/\$/g, ''),10);
        const expectedSubtotal = (priceWithoutDollarSign * quantity).toFixed(2);
        const expectedTotal = (priceWithoutDollarSign * quantity).toFixed(2);
        await expect(this.page.locator(`//tbody[.//a[contains(text(), '${productTitle}')]]`)).toBeVisible();
        await expect(this.page.locator(`//span[@class='product-unit-price'][text()='${productPrice}']`)).toBeVisible();
        await expect(this.page.locator(`//span[@class='product-subtotal'][text()='$${expectedSubtotal}']`)).toBeVisible();
        await expect(this.page.locator(`//tbody[.//input[@class='qty-input' and @value='${quantity}']]`)).toBeVisible();
        await expect(this.page.locator(`//tr[@class='order-subtotal']//span[@class='value-summary'][text()='$${expectedSubtotal}']`)).toBeVisible();
        await expect(this.page.locator(`//tr[@class='order-total']//span[@class='value-summary'][strong='$${expectedTotal}']`)).toBeVisible();
    }

    async editQuantityInCart(productTitle, quantity) {
        await this.page.locator(this._inputQuantity).click();
        await this.page.locator(this._inputQuantity).clear();
        await this.page.locator(this._inputQuantity).fill(quantity);
    }

    async selectDeliveryAddress(country, stateProvince, zip) {
        await this.page.locator(this._selectCountry).selectOption(country);
        await this.page.locator(this._selectState).selectOption(stateProvince);
        await this.page.locator(this._selectZip).type(zip);
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('networkidle');
      }

    async checkShippingCost(cost) {
        await expect(this.page.locator(`//tr[@class='shipping-cost']//span[@class='value-summary'][text()='$${cost}']`)).toBeVisible();
    }


    async removeProductFromCart(productTitle) {
        await this.page.locator(`//td[@class='product']/a[contains(text(), '${productTitle}')]/../following-sibling::td[@class='remove-from-cart']/button[@class='remove-btn']`).click();
    }

    async checkEmptyCart() {
        await this.page.locator(this._emptyCartText).isVisible();
    }

    async updateCart() {
        await this.page.locator(this._updateCartBtn).click();
    }

    async continueShopping() {
        await this.page.locator(this._continueShoppingBtn).click();
    }

    async selectShippingMethod(shippingMethod) {
        shippingMethod === 'Ground' ? await this.page.locator('(//label)[1]').click() : (shippingMethod === 'Next Day Air' ? await this.page.locator('(//label)[2]').click() : await this.page.locator('(//label)[3]').click());
    }

    async applyEstimateShipping() {
        await this.page.locator(this._applyBtn).click();
    }
    async openEstimateShipping() {
        await this.page.locator(this._estimateShippingBtn).click();
        await this.page.waitForLoadState('networkidle');
    }

    async addGiftWrapping() {
        await this.page.locator(this._selectGiftWrapping).selectOption('2');
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('networkidle');
    }

    async openCheckout() {
        await this.page.locator(this._checkoutBtn).click();
        return new CheckoutPage(this.page);
    }

    async checkTermsUfService() {
        await this.page.locator(this._termsofservice).check();
    }
    async checkGiftWrappingCost(productPrice, quantity, giftWrappingCost) {
        const priceWithoutDollarSign = parseInt(productPrice.replace(/\$/g, ''),10);
        const expectedSubtotal = (priceWithoutDollarSign * quantity + parseInt(giftWrappingCost)).toFixed(2);
        const expectedTotal = (priceWithoutDollarSign * quantity + parseInt(giftWrappingCost)).toFixed(2);
        await expect(this.page.locator(`//tr[@class='order-subtotal']//span[@class='value-summary'][text()='$${expectedSubtotal}']`)).toBeVisible();
        await expect(this.page.locator(`//tr[@class='order-total']//span[@class='value-summary'][strong='$${expectedTotal}']`)).toBeVisible();

    }
}

export default CartPage;
