import {expect} from "@playwright/test";
import BasePage from "./base-page";

class CategoryPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async open(category) {
        await this.page.goto(`/${category}`);

    }
    async verifyCategoryPage(category) {
        await expect(this.page.locator(`//h1[normalize-space()='${category}']`)).toBeVisible();
        await expect(this.page.locator(`//li[@class='active last']//a[normalize-space()='${category}']`)).toBeVisible();
    }

    async openSubCategoryPage(subCategory) {
        await this.page.locator(`//li[@class='inactive']//a[normalize-space()='${subCategory}']`).click();
    }
}
export default CategoryPage;
