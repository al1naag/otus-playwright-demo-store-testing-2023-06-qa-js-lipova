import { test } from '@playwright/test';
import HomePage from "../pages/home-page";
const productTitle = 'HTC One M8 Android L 5.0 Lollipop';

test('Edit Product\'s quantity in Wishlist', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToWishlist(productTitle);
    await homePage.verifyAddAction();
    const wishlistPage = await homePage.openWishlist();
    await wishlistPage.editQuantityInWishlist(productTitle, '3');
    await wishlistPage.updateWishlist();
    await wishlistPage.checkProductInWishlist(productTitle, productPrice, '3');
});

test('Remove Product from Wishlist', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.addProductToWishlist(productTitle);
    await homePage.verifyAddAction();
    const wishlistPage = await homePage.openWishlist();
    await wishlistPage.removeProductFromWishlist(productTitle);
    await wishlistPage.checkEmptyWishlist();
});

test('Add Product to Cart from Wishlist Page', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToWishlist(productTitle);
    await homePage.verifyAddAction();
    const wishlistPage = await homePage.openWishlist();
    await wishlistPage.selectAddToCartProduct(productTitle);
    const cartPage = await wishlistPage.addToCart();
    await cartPage.checkProductInCart(productTitle, productPrice, '1');
});





