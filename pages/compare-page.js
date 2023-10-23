import {expect} from "@playwright/test";
import BasePage from "./base-page";

;

class ComparePage extends BasePage {

    constructor(page) {
        super(page);
        this._emptyCompareText = '//div[contains(text(),"You have no items to compare.")]';
        this._clearBtn ='//a[normalize-space()="Clear list"]';
    }

    async checkProductInCompareProductsList(productTitle, productPrice) {
        await expect(this.page.locator(`//tr[@class='product-name']//a[contains(text(),'${productTitle}')]`)).toBeVisible();
        await expect(this.page.locator(`//td[normalize-space()='${productPrice}']`)).toBeVisible();
        }

    async removeProduct(productTitle) {
        await this.page.locator(`//tr[contains(., '${productTitle}')]/preceding-sibling::tr[contains(@class, 'remove-product')]//button[contains(text(), 'Remove')]
`).click();
    }

    async clearCompareProductsList() {
        await this.page.locator(this._clearBtn).click();
    }

    async checkEmptyCompareProducts() {
        await this.page.locator(this._emptyCompareText).isVisible();
    }

}
export default ComparePage;
