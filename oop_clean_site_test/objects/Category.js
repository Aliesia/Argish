const assert = require('assert');
const {By, until} = require('selenium-webdriver');

const Category = function (site, driver, animationTimeTimeout = 2000) {

    this.createCategory = function (PLcategoryName = 'pl_cat_test_' + Math.random().toString(36).substring(6),
                                    RUcategoryName = 'ru_cat_test_' + Math.random().toString(36).substring(6)) {
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('legend label')))
            .then(legendsData => {
                if (legendsData.length === 0) {
                    driver.get(site + '/cms/category/create')
                        .then(_ => driver.findElements(By.css('input')))
                        .then(inputs => inputs[1].sendKeys(PLcategoryName))
                        .then(_ => driver.findElements(By.css('input')))
                        .then(inputs => inputs[0].sendKeys(RUcategoryName))
                        .then(_ => driver.findElement(By.css('button')).click())
                }
            })

    };
    this.deleteCategory = function () {
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('legend label')))
            .then(legendsData => {
                if (legendsData.length > 0) {
                    legendsData[0].click().then(_ => driver.findElement(By.css('legend img')).click())
                        .then(_ => driver.findElement(By.className('careful')).click())
                        .then(_ => driver.wait(until.elementLocated(By.id('findelete')), animationTimeTimeout))
                        .then(_ => driver.findElement(By.className('red')).click());
                }
            })
    };

    this.canCreateCategoryTest = function () {
        let expectedCategoryCreationTitleName = 'Редактирование категории';
        let expectedCategoryListTitleName = 'Категории товаров';
        let PLcategoryName = 'pl_cat_test_' + Math.random().toString(36).substring(6);
        let RUcategoryName = 'ru_cat_test_' + Math.random().toString(36).substring(6);

        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.className('category')).click())
            .then(_ => driver.findElement(By.className('mainTitle')).getText())
            .then(referenceCategoryCreationTitle => assert.equal(referenceCategoryCreationTitle, expectedCategoryCreationTitleName, 'Expected Category Creation page is not correct'))
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[1].sendKeys(PLcategoryName))
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[0].sendKeys(RUcategoryName))
            .then(_ => driver.findElement(By.css('button')).click())
            .then(_ => driver.findElement(By.className('mainTitle')).getText())
            .then(referenceCategoryListTitle => assert.equal(referenceCategoryListTitle, expectedCategoryListTitleName, 'Expected Category List page is not correct'))
            .then(_ => driver.findElement(By.css('legend label')).getText())
            .then(data => {
                if (!data.toLowerCase().includes(PLcategoryName.toLowerCase())) {
                    assert.fail(data, PLcategoryName, 'Can not find created category in CMS')
                }
            })
            .then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).getText())
            .then(data => {
                if (!data.toLowerCase().includes(PLcategoryName.toLowerCase())) {
                    assert.fail(data, PLcategoryName, 'Can not find created category on Site')
                }
            })
    };
    this.canDeleteCategoryTest = function () {
        let minimumCategoryQuantity = 1;
        let actualCategoryQuantity;
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('legend label')))
            .then(legendsData => {
                if (legendsData.length === 0) {
                    assert.fail(legendsData.length, minimumCategoryQuantity, 'Not enough categories to run test')
                }
                if (legendsData.length > 0) {
                    actualCategoryQuantity = legendsData.length;
                    legendsData[0].click().then(_ => driver.findElement(By.css('legend img')).click())
                        .then(_ => driver.findElement(By.className('careful')).click())
                        .then(_ => driver.wait(until.elementLocated(By.id('findelete')), animationTimeTimeout))
                        .then(_ => driver.findElement(By.className('red')).click())
                        .then(_ => driver.findElements(By.css('legend label')))
                        .then(legendsData => {
                            if ((actualCategoryQuantity - legendsData.length) !== 1) {
                                assert.fail(legendsData.length, actualCategoryQuantity - 1, 'Can not delete category')
                            }
                        })
                }
            })
    };

    this.createSubCategory = function (PLsubCategoryName = 'pl_scat_test_' + Math.random().toString(36).substring(6),
                                       RUsubCategoryName = 'ru_scat_test_' + Math.random().toString(36).substring(6)) {
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('legend label')))
            .then(legendsData => {
                if (legendsData.length === 0) {
                    driver.get(site + '/cms/category/create')
                        .then(_ => driver.findElements(By.css('input')))
                        .then(inputs => inputs[1].sendKeys(PLcategoryName))
                        .then(_ => driver.findElements(By.css('input')))
                        .then(inputs => inputs[0].sendKeys(RUcategoryName))
                        .then(_ => driver.findElement(By.css('button')).click())
                }
            })

    };
    this.deleteSubCategory = function () {
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('fieldset label:nth-child(2)')))
            .then(legendsData => {
                if (legendsData.length > 0) {
                    legendsData[0].click().then(_ => driver.findElement(By.css('fieldset label:nth-child(2) img')).click())
                        .then(_ => driver.sleep(2000))
                        .then(_ => driver.findElement(By.className('careful')).click())
                        .then(_ => driver.wait(until.elementLocated(By.id('findelete')), animationTimeTimeout))
                        .then(_ => driver.findElement(By.className('red')).click());
                }
            })
    };

    this.canCreateSubCategoryTest = function () {
        let expectedSubCategoryCreationTitle = 'Редактирование категории';
        let expectedSubCategoryListTitle = 'Категории товаров';
        let PLsubCategoryName = 'pl_scat_test_' + Math.random().toString(36).substring(6);
        let RUsubCategoryName = 'ru_scat_test_' + Math.random().toString(36).substring(6);

        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.className('addListItem')).click())
            .then(_ => driver.findElement(By.className('mainTitle')).getText())
            .then(referenceSubCategoryCreationTitle => assert.equal(referenceSubCategoryCreationTitle, expectedSubCategoryCreationTitle, 'Expected sub-Category Creation page is not correct'))
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[1].sendKeys(PLsubCategoryName))
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[0].sendKeys(RUsubCategoryName))
            .then(_ => driver.findElement(By.css('button')).click())
            .then(_ => driver.findElement(By.className('mainTitle')).getText())
            .then(referenceSubCategoryListTitle => assert.equal(referenceSubCategoryListTitle, expectedSubCategoryListTitle, 'Expected Category List page is not correct'))
            .then(_ => driver.findElement(By.css('fieldset:nth-child(1) > label:nth-last-child(2)')).getText())
            .then(name => {
                if (!name.toLowerCase().includes(PLsubCategoryName.toLowerCase())) {
                    assert.fail(name, PLsubCategoryName, 'Can not find created sub-category in CMS')
                }
            })
            .then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('.drop-down li:nth-last-child(1) > a')).getText())
            .then(name => {
                if (!name.toLowerCase().includes(PLsubCategoryName.toLowerCase())) {
                    assert.fail(name, PLsubCategoryName, 'Can not find created sub-category on Site')
                }
            })
    };
    this.canDeleteSubCategoryTest = function () {
        let minimumSubCategoryQuantity = 1;
        let actualSubCategoryQuantity;
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('.sub')))
            .then(legendsData => {
                if (legendsData.length === 0) {
                    assert.fail(legendsData.length, minimumSubCategoryQuantity, 'Not enough sub-categories to run test')
                }
                if (legendsData.length > 0) {
                    actualSubCategoryQuantity = legendsData.length;
                    legendsData[0].click().then(_ => driver.findElement(By.css('fieldset:nth-child(1) > label:nth-last-child(2) img')).click())
                        .then(_ => driver.findElement(By.className('careful')).click())
                        .then(_ => driver.wait(until.elementLocated(By.id('findelete')), animationTimeTimeout))
                        .then(_ => driver.findElement(By.className('red')).click())
                        .then(_ => driver.findElements(By.css('fieldset:nth-child(1) > label')))
                        .then(legendsData => {
                            if ((actualSubCategoryQuantity - legendsData.length) !== 1) {
                                assert.fail(legendsData.length, actualSubCategoryQuantity - 1, 'Can not delete sub-category')
                            }
                        })
                }
            })
    };





    this.canGetToCMSCategoryTest = function () {
        let expectedPageCMSTitle = 'Категории товаров';
        return driver.get(site)
            .then(_ => driver.findElement(By.css('[title="CMS"]')).click())
            .then(_ => driver.findElement(By.css('.ico_categ ')).click())
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
            .then(_ => driver.wait(until.titleIs(logViewer)))

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
        let titleSiteRU = 'Argish — натуральные масла и продукция из пантов марала';
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.css('.u-pull-right img')).click())
            .then(_ => driver.wait(until.titleIs(titleSiteRU)))
    }
};


module.exports = Category;