import CartPage from "./cart-page";
import SearchPage from "./search-page";
import BasePage from "./base-page";
import CategoryPage from "./category-page";
import WishlistPage from "./wishlist-page";
import {expect} from "@playwright/test";
import ComparePage from "./compare-page";

class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this._cartLink = '//a[normalize-space()="shopping cart"]';
        this._wishlistLink = '//a[normalize-space()="wishlist"]';
        this._comparisonLink = '//a[normalize-space()="product comparison"]';
        this._inputSearch = '#small-searchterms';
        this._btnSearch = '//button[normalize-space()="Search"]';
        this._headerSearch = '//h1[normalize-space()="Search"]';
    }

    async open() {
        await this.page.goto('/');
    }

    async searchProduct(productTitle) {
        await this.page.locator(this._inputSearch).fill(productTitle);
        await this.page.locator(this._btnSearch).click();
        await this.page.waitForURL(`**/search?q=*`);
        await expect(this.page.locator(this._headerSearch)).toBeVisible();
        return new SearchPage(this.page);
    }
    async getProductPrice(productTitle) {
        const priceXPath = `//h2[a[contains(text(), '${productTitle}')]]/parent::div//span[@class='price actual-price']`;
        const priceElement = await this.page.waitForSelector(priceXPath);
        const productPrice = await priceElement.innerText();
        return productPrice;
    }

    async addProductToCart(productTitle) {
        const addToCartButton = this.page.locator(`//h2[a[contains(text(), '${productTitle}')]]/parent::div//button[contains(text(), 'Add to cart')]`);
        await addToCartButton.click();
    }

    async addProductToWishlist(productTitle) {
        const addToCartButton = this.page.locator(`//h2[a[contains(text(), '${productTitle}')]]/parent::div//button[contains(text(), 'Add to wishlist')]`);
        await addToCartButton.click();
    }

    async verifyAddAction() {
        await expect(this.page.locator('//p[contains(text(),"The product has been added to your ")]')).toBeVisible();
    }

    async addProductToComparison(productTitle) {
        const addToCartButton = this.page.locator(`//h2[a[contains(text(), '${productTitle}')]]/parent::div//button[contains(text(), 'Add to compare list')]`);
        await addToCartButton.click();
    }

    async openCart() {
        await this.page.locator(this._cartLink).click();
        await this.page.waitForURL('**/cart');
        return new CartPage(this.page);
    }

    async openWishlist() {
        await this.page.locator(this._wishlistLink).click();
        await this.page.waitForURL('**/wishlist');
        return new WishlistPage(this.page);
    }
    async openCompareProducts() {
        await this.page.locator(this._comparisonLink).click();
        await this.page.waitForURL('**/compareproducts');
        return new ComparePage(this.page);
    }
    async openCategoryPage(category) {
        await this.page.locator(`//ul[@class='top-menu notmobile']//a[normalize-space()='${category}']`).click();
        await this.page.waitForLoadState('networkidle');
        return new CategoryPage(this.page);
    }
}

export default HomePage;
