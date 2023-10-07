import {expect} from "@playwright/test";
import CartPage from "./cart-page";


class Wishlist {
    constructor(page) {
        this.page = page;
        this._inputQuantity = '.qty-input';
        this._updateWishlistBtn = '//button[@id="updatecart"]';
        this._emptyWishlistText = '//div[contains(text(),"The wishlist is empty!")]';
        this._addToCartBtn = '//button[normalize-space()="Add to cart"]';

    }

    async checkProductInWishlist(productTitle, productPrice, quantity) {
        const priceWithoutDollarSign = parseInt(productPrice.replace(/\$/g, ''),10);
        const expectedSubtotal = (priceWithoutDollarSign * quantity).toFixed(2);
        await expect(this.page.locator(`//tbody[.//a[contains(text(), '${productTitle}')]]`)).toBeVisible();
        await expect(this.page.locator(`//span[@class='product-unit-price'][text()='${productPrice}']`)).toBeVisible();
        await expect(this.page.locator(`//span[@class='product-subtotal'][text()='$${expectedSubtotal}']`)).toBeVisible();
        await expect(this.page.locator(`//tbody[.//input[@class='qty-input' and @value='${quantity}']]`)).toBeVisible();
        }

    async editQuantityInWishlist(productTitle, quantity) {
        await this.page.locator(this._inputQuantity).click();
        await this.page.locator(this._inputQuantity).clear();
        await this.page.locator(this._inputQuantity).fill(quantity);
    }

    async updateWishlist() {
        await this.page.locator(this._updateWishlistBtn).click();
    }

    async selectAddToCartProduct(productTitle) {
        await this.page.locator(`//td[@class='product']/a[contains(text(), '${productTitle}')]/../preceding-sibling::td[@class='add-to-cart']//input[@name='addtocart']`).click();
    }

    async addToCart() {
        await this.page.locator(this._addToCartBtn).click();
        return new CartPage(this.page);
    }

    async removeProductFromWishlist(productTitle) {
        await this.page.locator(`//td[@class='product']/a[contains(text(), '${productTitle}')]/../following-sibling::td[@class='remove-from-cart']/button[@class='remove-btn']`).click();
    }

    async checkEmptyWishlist() {
        await this.page.locator(this._emptyWishlistText).isVisible();
    }

}
export default Wishlist;
