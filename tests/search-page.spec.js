import { test } from '@playwright/test';
import HomePage from "../pages/home-page";
const productTitle = 'HTC One M8 Android L 5.0 Lollipop';

test('Add Product in Cart from Search Page', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.searchProduct(productTitle);
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    await homePage.verifyAddAction();
    const cartPage = await homePage.openCart();
    await cartPage.checkProductInCart(productTitle, productPrice, '1');
});

test('Search the Product', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const searchPage = await homePage.searchProduct(productTitle);
    await searchPage.checkProductInSearchResult(productTitle);
});

