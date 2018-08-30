const assert = require('assert');
const {By, until} = require('selenium-webdriver');

const CategoryButtonTests = function (site, driver, animationTimeTimeout = 5000) {

    this.canGetToCMSCategoryTest = function () {
        let expectedPageCMSTitle = 'Категории товаров';
        return  driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(pageCMSTitle => assert.equal(pageCMSTitle, expectedPageCMSTitle, 'can not enter CMS Category page'))
    };
    this.canGoToSiteTest = function () {
        let expectedSiteTitle = 'Argish - Olej naturalny i artykuły z pantów jelenia';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('header a:nth-of-type(1)')).click())
            .then(_ => driver.getAllWindowHandles())
            .then(handles => {
                driver.switchTo().window(handles[1])
                    .then(_ => driver.getTitle())
                    .then(Title => assert.equal(Title, expectedSiteTitle))
                    .then(_ => driver.close())
                    .then(_ => driver.switchTo().window(handles[0]))
            })
    };
    this.canCleanCacheTest = function () {
        let expectedPageCMSTitle = 'Категории товаров';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('header a:nth-of-type(2)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(pageCMSTitle => assert.equal(pageCMSTitle, expectedPageCMSTitle, 'can not clear cache of page'))
    };
    this.canVisitLogsTest = function () {
        let logViewer = 'Laravel log viewer';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('header a:nth-of-type(3)')).click())
            .then(_ => driver.wait(until.titleIs(logViewer), animationTimeTimeout))

    };
    this.canVisitShopTest = function () {
        let expectedOrdersPageTitle = 'Список заказов';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('.act')).click(), animationTimeTimeout)
            .then(_ => driver.findElement(By.css('h2')).getText())
            .then(ordersPageTitle => assert.equal(ordersPageTitle, expectedOrdersPageTitle, 'can not enter CMS Orders page'))
    };
    this.canVisitPostsTest = function () {
        let expectedPostsPageTitle = 'Статьи';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('nav a:nth-of-type(2)')).click(), animationTimeTimeout)
            .then(_ => driver.findElement(By.css('.u-pull-right a:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(postsPageTitle => assert.equal(postsPageTitle, expectedPostsPageTitle, 'can not enter CMS Posts page'))
    };
    this.canVisitSEOPageTest = function () {
        let expectedSeoPageTitle = 'SEO : Главная';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('nav a:nth-of-type(3)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(seoPageTitle => assert.equal(seoPageTitle, expectedSeoPageTitle, 'can not enter CMS SEO page'))
    };
    this.canVisitCommentsPageTest = function () {
        let expectedCommentsPageTitle = 'CMS : Комментарии';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('[title="Комментарии"]')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(commentsPageTitle => assert.equal(commentsPageTitle, expectedCommentsPageTitle, 'can not enter CMS Comment page'))
    };
    this.canVisitProductsPageTest = function () {
        let expectedProductsPageTitle = 'Список товаров';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.className('ico_prodlist ')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(productsPageTitle => assert.equal(productsPageTitle, expectedProductsPageTitle, 'can not enter CMS Products page'))
    };
    this.canVisitOrdersPageTest = function () {
        let expectedOrdersPageTitle = 'Список заказов';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.className('ico_orders')).click())
            .then(_ => driver.findElement(By.css('._text-27')).getText())
            .then(ordersPageTitle => assert.equal(ordersPageTitle, expectedOrdersPageTitle, 'can not enter CMS Orders page'))
    };
    this.canLogOutTest = function () {
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('.u-pull-right img')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('banner')), animationTimeTimeout))
    }
};


module.exports = CategoryButtonTests;