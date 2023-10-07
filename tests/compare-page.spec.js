import { test } from '@playwright/test';
import HomePage from "../pages/home-page";
const productTitle = 'HTC One M8 Android L 5.0 Lollipop';

test('Remove Product from Compare Products List', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.addProductToComparison(productTitle);
    await homePage.verifyAddAction();
    const comparisonPage = await homePage.openCompareProducts();
    await comparisonPage.removeProduct(productTitle);
    await comparisonPage.checkEmptyCompareProducts();
});

test('Clear Compare Products List', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.addProductToComparison(productTitle);
    await homePage.verifyAddAction();
    const comparisonPage = await homePage.openCompareProducts();
    await comparisonPage.clearCompareProductsList();
    await comparisonPage.checkEmptyCompareProducts();
});

