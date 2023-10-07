import {test} from '@playwright/test';
import config from "../config/config.js";
import HomePage from "../pages/home-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";

const {user} = config;
const productTitle = 'HTC One M8 Android L 5.0 Lollipop';

test('Checkout as a guest', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    const cartPage = await homePage.openCart();
    await cartPage.checkTermsUfService();
    const checkoutPage = await cartPage.openCheckout();
    await checkoutPage.openCheckoutAsGuest();
    await checkoutPage.fillBillingAddress({user});
    await checkoutPage.saveBillingForm();
    await checkoutPage.selectShippingMethod('Next Day Air');
    await checkoutPage.saveShippingMethod();
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.savePaymentMethod();
    await checkoutPage.fillPaymentInformation({user});
    await checkoutPage.savePaymentInfo();
    await checkoutPage.checkBillingInfo({user});
    await checkoutPage.checkShippingAddress({user});
    await checkoutPage.checkPaymentMethod('Credit Card');
    await checkoutPage.checkShippingMethod('Next Day Air');
    await checkoutPage.checkProductInCheckout(productTitle, productPrice, '1');
});

test('Checkout as a user', async ({page}) => {
    const registerPage = new RegisterPage(page)
    await registerPage.registerNewUser({user})
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.login({user});
    const productPrice = await homePage.getProductPrice(productTitle);
    await homePage.addProductToCart(productTitle, productPrice);
    const cartPage = await homePage.openCart();
    await cartPage.checkTermsUfService();
    const checkoutPage = await cartPage.openCheckout();
    await checkoutPage.fillBillingAddress({user});
    await checkoutPage.saveBillingForm();
    await checkoutPage.selectShippingMethod('Next Day Air');
    await checkoutPage.saveShippingMethod();
    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.savePaymentMethod();
    await checkoutPage.fillPaymentInformation({user});
    await checkoutPage.savePaymentInfo();
    await checkoutPage.checkBillingInfo({user});
    await checkoutPage.checkShippingAddress({user});
    await checkoutPage.checkPaymentMethod('Credit Card');
    await checkoutPage.checkShippingMethod('Next Day Air');
    await checkoutPage.checkProductInCheckout(productTitle, productPrice, '1');
});
