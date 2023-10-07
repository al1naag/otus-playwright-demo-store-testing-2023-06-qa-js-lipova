import { test } from '@playwright/test';
import HomePage from "../pages/home-page";
const productTitle = 'HTC One M8 Android L 5.0 Lollipop';

test('Add Product to Cart from Home Page', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle);
    await homePage.verifyAddAction();
    const cartPage = await homePage.openCart();
    await cartPage.checkProductInCart(productTitle, productPrice, '1');
});

test('Add Product to Wishlist from Home Page', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToWishlist(productTitle);
    await homePage.verifyAddAction();
    const wishlistPage = await homePage.openWishlist();
    await wishlistPage.checkProductInWishlist(productTitle, productPrice, '1');
});

test('Add Product to Compare Products List from Home Page', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToComparison(productTitle);
    await homePage.verifyAddAction();
    const comparisonPage = await homePage.openCompareProducts();
    await comparisonPage.checkProductInCompareProductsList(productTitle, productPrice);
});







