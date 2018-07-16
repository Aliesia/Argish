const assert = require('assert');
const {By, until} = require('selenium-webdriver');

const Order = function (site, driver, animationTimeTimeout = 2000) {

    this.canGetToCMSOrderTest = function () {
        let expectedPageCMSTitle = 'Список заказов';
        return driver.get(site)
            .then(_ => driver.findElement(By.css('[title="CMS"]')).click())
            .then(_ => driver.findElement(By.css('.ico_orders')).click())
            .then(_ => driver.findElement(By.css('._text-27')).getText())
            .then(pageCMSTitle => assert.equal(pageCMSTitle, expectedPageCMSTitle, 'can not enter CMS Order page'))
    };

    this.canVisitShopTest = function () {
        let expectedOrdersPageTitle = 'Список заказов';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.findElement(By.css('.li-16')).click(), animationTimeTimeout)
            .then(_ => driver.findElement(By.css('h2')).getText())
            .then(ordersPageTitle => assert.equal(ordersPageTitle, expectedOrdersPageTitle, 'can not enter CMS Orders page'))
    };
    this.canVisitPostsTest = function () {
        let expectedPostsPageTitle = 'Статьи';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.findElement(By.css('.li-17')).click(), animationTimeTimeout)
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(postsPageTitle => assert.equal(postsPageTitle, expectedPostsPageTitle, 'can not enter CMS Posts page'))
    };
    this.canVisitSEOPageTest = function () {
        let expectedSeoPageTitle = 'SEO : Главная';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.findElement(By.css('.li-18')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(seoPageTitle => assert.equal(seoPageTitle, expectedSeoPageTitle, 'can not enter CMS SEO page'))
    };

    this.canVisitCommentsPageTest = function () {
        let expectedCommentsPageTitle = 'CMS : Комментарии';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('._container-14 div:nth-of-type(4)')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(commentsPageTitle => assert.equal(commentsPageTitle, expectedCommentsPageTitle, 'can not enter CMS Comment page'))
    };
    this.canVisitCategoryPageTest = function () {
        let expectedCategoryPageTitle = 'Категории товаров';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.findElement(By.css('._container-14 div:nth-of-type(3)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(categoryPageTitle => assert.equal(categoryPageTitle, expectedCategoryPageTitle, 'can not enter CMS Category page'))
    };
    this.canVisitProductPageTest = function () {
        let expectedProductsPageTitle = 'Список товаров';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.findElement(By.css('._container-14 div:nth-of-type(2)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(productsPageTitle => assert.equal(productsPageTitle, expectedProductsPageTitle, 'can not enter CMS Products page'))
    };
    this.canVisitAboutUsPageTest = function () {
        let expectedAboutUsPageTitle = 'Редактирование страницы «О нас»';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.findElement(By.css('.menuitem-66')).click())
            .then(_ => driver.findElement(By.css('h2')).getText())
            .then(aboutUsPageTitle => assert.equal(aboutUsPageTitle, expectedAboutUsPageTitle, 'can not enter CMS AboutUs page'))
    };
    this.canLogOutTest = function () {
        let titleSiteRU = 'Argish — натуральные масла и продукция из пантов марала';
        return driver.get(site + '/cms/orders')
            .then(_ => driver.findElement(By.css('.off')).click())
            .then(_ => driver.wait(until.titleIs(titleSiteRU)))
    }
};

module.exports = Order;