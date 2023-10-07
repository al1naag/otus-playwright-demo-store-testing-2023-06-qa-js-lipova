import { test } from '@playwright/test';
import HomePage from "../pages/home-page";
import CategoryPage from "../pages/category-page";

test('View category products', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const categoryPage = await homePage.openCategoryPage('Books');
    await categoryPage.verifyCategoryPage('Books');
});

test('Navigate to sub category page from side bar', async ({page}) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.open('Computers');
    await categoryPage.openSubCategoryPage('Desktops');
    await categoryPage.verifyCategoryPage('Desktops');
});






