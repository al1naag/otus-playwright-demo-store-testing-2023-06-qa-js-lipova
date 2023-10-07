import {expect} from "@playwright/test";


class SearchPage {
    constructor(page) {
        this.page = page;
    }

    async checkProductInSearchResult(productTitle) {
        await expect(this.page.locator(`//h2[@class='product-title']//a[contains(text(),'${productTitle}')]`)).toBeVisible();
    }

}
export default SearchPage;
