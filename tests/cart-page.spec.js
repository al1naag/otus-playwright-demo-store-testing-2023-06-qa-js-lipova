import { test } from '@playwright/test';
import HomePage from "../pages/home-page";
const productTitle = 'HTC One M8 Android L 5.0 Lollipop';

test('Edit Product\'s quantity in Cart', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    await homePage.verifyAddAction();
    const cartPage = await homePage.openCart();
    await cartPage.editQuantityInCart(productTitle, '3');
    await cartPage.updateCart();
    await cartPage.checkProductInCart(productTitle, productPrice, '3');
});

test('Remove Product from Cart', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    await homePage.verifyAddAction();
    const cartPage = await homePage.openCart();
    await cartPage.removeProductFromCart(productTitle);
    await cartPage.checkEmptyCart()
});

test('Check continue shopping button in Cart', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    await homePage.verifyAddAction();
    const cartPage = await homePage.openCart();
    await cartPage.continueShopping();
    await page.waitForURL('/');
});

test('Estimate shipping in Cart', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    await homePage.verifyAddAction();
    const cartPage = await homePage.openCart();
    await cartPage.openEstimateShipping();
    await cartPage.selectDeliveryAddress('United States', 'California', '97001');
    await cartPage.selectShippingMethod('Next Day Air')
    await cartPage.applyEstimateShipping();
    await cartPage.checkShippingCost('0.00');
});

test('Add Gift wrapping in Cart', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    await homePage.verifyAddAction();
    const cartPage = await homePage.openCart();
    await cartPage.addGiftWrapping();
    await cartPage.checkGiftWrappingCost(productPrice,1, '10.00');
});




