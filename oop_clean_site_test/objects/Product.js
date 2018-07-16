const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const displayResult = require('../objects/Helpers');

const Product = function (site, driver, animationTimeTimeout = 2000) {

    function fillForm(language, productName, price, quantity, sku) {
        driver
            .then(_ => driver.findElement(By.name('trans[' + language + '][name]')).clear())
            .then(_ => driver.findElement(By.name('trans[' + language + '][name]')).sendKeys(productName))
            .then(_ => driver.findElement(By.name('price')).clear())
            .then(_ => driver.findElement(By.name('price')).sendKeys(price))
            .then(_ => driver.findElement(By.name('quantity')).clear())
            .then(_ => driver.findElement(By.name('quantity')).sendKeys(quantity))
            .then(_ => driver.findElement(By.name('sku')).clear())
            .then(_ => driver.findElement(By.name('sku')).sendKeys(sku))
    }

    this.createProduct = function (PlProductName = 'pl_prod_test_' + Math.random().toString(36).substring(6),
                                   RuProductName = 'ru_prod_test_' + Math.random().toString(36).substring(6),
                                   uniquePriceOfProduct = '123',
                                   uniqueQuantityOfProduct = '123',
                                   uniqueIdOfProduct = '0123') {
        return driver.get(site + '/cms/product/create')
            .then(_ => fillForm('pl', PlProductName, uniquePriceOfProduct, uniqueQuantityOfProduct, uniqueIdOfProduct))
            .then(_ => driver.findElement(By.css('.publish > input')).click())
            .then(_ => driver.findElement(By.css('form')).submit())

    };
    this.deleteProduct = function () {
        let minimumProductsQuantity = 1;
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElements(By.css('.tablelist tbody > tr')))
            .then(productListData => {
                if (productListData.length > 0) {
                    driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(5) a:nth-child(3) img')).click()
                        .then(_ => driver.wait(until.elementLocated(By.id('findelete')), animationTimeTimeout))
                        .then(_ => driver.findElement(By.id('findelete')).click());
                }
            })

    };

    this.canCreateProductTest = function () {
        let expectedProductTitle = 'Основная информация о товаре';
        let uniqueNameOfProduct = 'Unique Name Of Product_' + Math.random().toString(36).substring(7);
        let uniquePriceOfProduct = '123';
        let uniqueQuantityOfProduct = '123';
        let uniqueIdOfProduct = '0123';
        return driver.get(site + '/cms/product')
            .then(_ => driver.wait(until.titleIs('CMS: Список'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.button')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(newProductTitle => assert.equal(newProductTitle, expectedProductTitle, 'can not enter product creation page'))
            .then(_ => fillForm('pl', uniqueNameOfProduct, uniquePriceOfProduct, uniqueQuantityOfProduct, uniqueIdOfProduct))
            .then(_ => driver.findElement(By.css('.categories > fieldset legend input')).click())
            .then(_ => driver.findElement(By.css('.publish > input')).click())
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.get(site + '/cms/product'))
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product in CMS products page'))
            .then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a span')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product on Site category page'))
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.promo-info h1')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see proper product name on Site product page'))
    };

    this.canEditProductTest = function () {
        let uniqueNameOfProduct = 'Unique Name Of Product_' + Math.random().toString(36).substring(7);
        let uniquePriceOfProduct = '98';
        let uniqueQuantityOfProduct = '98';
        let uniqueIdOfProduct = '09';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).click())
            .then(_ => fillForm('pl', uniqueNameOfProduct, uniquePriceOfProduct, uniqueQuantityOfProduct, uniqueIdOfProduct))
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.wait(until.elementLocated(By.css('main .plate header nav > a:nth-of-type(2)')), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(2)')).click())
            .then(_ => driver.findElement(By.css('.maintitle')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see proper product in CMS description product page'))
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(3)')).click())
            .then(_ => driver.findElement(By.css('.wide label')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see proper product in CMS similar products page'))
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(4)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(productName => {
                if (!productName.includes(uniqueNameOfProduct))
                    assert.fail(uniqueNameOfProduct, productName)
            })
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(4) img')).click())
            .then(_ => driver.getAllWindowHandles())
            .then(handles => {
                driver.switchTo().window(handles[1])
                    .then(_ => driver.findElement(By.css('.promo-info h1')).getText())
                    .then(productName => assert.equal(productName, uniqueNameOfProduct))
                    .then(_ => driver.close())
                    .then(_ => driver.switchTo().window(handles[0]))
            })
    };

    this.canDeleteProductTest = function () {

        let actualProductsQuantity;
        let minimumProductsQuantity = 1;
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElements(By.css('.tablelist tbody > tr')))
            .then(productListData => {
                actualProductsQuantity = productListData.length;
                if (actualProductsQuantity === 0) {
                    assert.fail(actualProductsQuantity, minimumProductsQuantity, 'Not enough products to run test')
                }
            })
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(5) a:nth-child(3) img')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('findelete')), animationTimeTimeout))
            .then(_ => driver.findElement(By.id('findelete')).click())
            .then(_ => driver.findElements(By.css('.tablelist tbody > tr')))
            .then(productListData => {
                if ((actualProductsQuantity - productListData.length) !== 1) {
                    assert.fail(productListData.length, actualProductsQuantity - 1, 'Can not delete product')
                }
            })
    };

    this.unpublishedProductTest = function (uniqueNameOfProduct) {

        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(5) img')).click())
            .then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a span')).getText())
            .then(productName => assert.notEqual(productName, uniqueNameOfProduct, 'can see product on site page, but visibility is off'))
    };

    this.lowQuantityProductTest = function () {
        let expectedProductTitle = 'Основная информация о товаре';
        let uniqueNameOfProduct = 'Unique Name Of Product_' + Math.random().toString(36).substring(7);
        let uniquePriceOfProduct = '123';
        let uniqueQuantityOfProduct = '0';
        let uniqueIdOfProduct = '0123';
        return driver.get(site + '/cms/product')
            .then(_ => driver.wait(until.titleIs('CMS: Список'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.button')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(newProductTitle => assert.equal(newProductTitle, expectedProductTitle, 'can not enter product creation page'))
            .then(_ => fillForm('pl', uniqueNameOfProduct, uniquePriceOfProduct, uniqueQuantityOfProduct, uniqueIdOfProduct))
            .then(_ => driver.findElement(By.css('.categories > fieldset legend input')).click())
            .then(_ => driver.findElement(By.css('.publish > input')).click())
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.get(site + '/cms/product'))
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product in CMS products page'))
            .then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a span')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product on Site category page'))
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.promo-info h1')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see proper product name on Site product page'))
            .then(_ => driver.findElement(By.className('gray')))
            .catch(function () {
                assert.fail('there is no such element on this page')
            });
    };

    this.absentSKUProductTest = function () {
        let expectedProductTitle = 'Основная информация о товаре';
        let uniqueNameOfProduct = 'Unique Name Of Product_' + Math.random().toString(36).substring(7);
        let uniquePriceOfProduct = '123';
        let uniqueQuantityOfProduct = '123';
        return driver.get(site + '/cms/product')
            .then(_ => driver.wait(until.titleIs('CMS: Список'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.button')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(newProductTitle => assert.equal(newProductTitle, expectedProductTitle, 'can not enter product creation page'))
            .then(_ => fillForm('pl', uniqueNameOfProduct, uniquePriceOfProduct, uniqueQuantityOfProduct, ''))
            .then(_ => driver.findElement(By.css('.categories > fieldset legend input')).click())
            .then(_ => driver.findElement(By.css('.publish > input')).click())
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.get(site + '/cms/product'))
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product in CMS products page'))
            .then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a span')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product on Site category page'))
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.promo-info h1')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see proper product name on Site product page'))
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.css('.etc-info-cart')).getText())
            .then(referenceSKU => {
                if (referenceSKU.match('/\d+((.|,)\d+)?/')) {
                    displayResult('SKU number exists')
                }
                else {
                    displayResult('there is no SKU number')
                }
            });

    };

    this.canRemoveFromCartProductTest = function () {
        let actualProductsQuantity;
        let minimumProductsQuantity = 1;
        return driver
            .then(_ => driver.findElement(By.css('.card-panel .info')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElements(By.css('.dell-row')))
            .then(orderListData => {
                actualProductsQuantity = orderListData.length;
                if (actualProductsQuantity === 0) {
                    assert.fail(actualProductsQuantity, minimumProductsQuantity, 'Not enough products in cart to delete')
                } else if (actualProductsQuantity > 0) {
                    driver.findElement(By.css('.dell-row')).click()
                }
            })
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElements(By.css('.dell-row')))
            .then(orderListData => {
                if (actualProductsQuantity - orderListData.length !== 1) {
                    assert.fail(actualProductsQuantity, minimumProductsQuantity, 'Not enough products in cart to delete')
                }
            })


    };

    this.canAddToCart = function () {
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.css('.cart-tr')))
    };

    this.canAddProductToCartTest = function () {
        let actualProductsQuantity;
        let minimumProductsQuantity = 1;
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElements(By.css('.cart-tr')))
            .then(orderListData => {
                actualProductsQuantity = orderListData.length;
                displayResult(actualProductsQuantity);
                if (actualProductsQuantity === 0) {
                    assert.fail(actualProductsQuantity, minimumProductsQuantity, 'Not enough products in cart')
                }
            })

    };


    this.canGetToCMSProductTest = function () {
        let expectedPageCMSTitle = 'Список товаров';
        return driver.get(site)
            .then(_ => driver.findElement(By.css('[title="CMS"]')).click())
            .then(_ => driver.findElement(By.css('.ico_prodlist')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(pageCMSTitle => assert.equal(pageCMSTitle, expectedPageCMSTitle, 'can not enter CMS Category page'))
    };

    this.canGoToSiteTest = function () {
        let expectedSiteTitle = 'Argish - Olej naturalny i artykuły z pantów jelenia';
        return driver.get(site + '/cms/product')
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
        let expectedPageCMSTitle = 'Список товаров';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('header a:nth-of-type(2)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(pageCMSTitle => assert.equal(pageCMSTitle, expectedPageCMSTitle, 'can not enter CMS comments page'))
    };
    this.canVisitLogsTest = function () {
        let logViewer = 'Laravel log viewer';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('header a:nth-of-type(3)')).click())
            .then(_ => driver.wait(until.titleIs(logViewer)))

    };
    this.canVisitShopTest = function () {
        let expectedOrdersPageTitle = 'Список заказов';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('.act')).click(), animationTimeTimeout)
            .then(_ => driver.findElement(By.css('h2')).getText())
            .then(ordersPageTitle => assert.equal(ordersPageTitle, expectedOrdersPageTitle, 'can not enter CMS Orders page'))
    };
    this.canVisitPostsTest = function () {
        let expectedPostsPageTitle = 'Статьи';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('nav a:nth-of-type(2)')).click(), animationTimeTimeout)
            .then(_ => driver.findElement(By.css('.u-pull-right a:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(postsPageTitle => assert.equal(postsPageTitle, expectedPostsPageTitle, 'can not enter CMS Posts page'))
    };
    this.canVisitSEOPageTest = function () {
        let expectedSeoPageTitle = 'SEO : Главная';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('nav a:nth-of-type(3)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(seoPageTitle => assert.equal(seoPageTitle, expectedSeoPageTitle, 'can not enter CMS SEO page'))
    };

    this.canVisitCommentsPageTest = function () {
        let expectedCommentsPageTitle = 'CMS : Комментарии';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('[title="Комментарии"]')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(commentsPageTitle => assert.equal(commentsPageTitle, expectedCommentsPageTitle, 'can not enter CMS Category page'))
    };
    this.canVisitCategoryPageTest = function () {
        let expectedCategoryPageTitle = 'Категории товаров';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.className('ico_categ ')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(productsPageTitle => assert.equal(productsPageTitle, expectedCategoryPageTitle, 'can not enter CMS Products page'))
    };
    this.canVisitOrdersPageTest = function () {
        let expectedOrdersPageTitle = 'Список заказов';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.className('ico_orders')).click())
            .then(_ => driver.findElement(By.css('._text-27')).getText())
            .then(ordersPageTitle => assert.equal(ordersPageTitle, expectedOrdersPageTitle, 'can not enter CMS Orders page'))
    };
    this.canLogOutTest = function () {
        let titleSiteRU = 'Argish — натуральные масла и продукция из пантов марала';
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('.u-pull-right img')).click())
            .then(_ => driver.wait(until.titleIs(titleSiteRU)))
    };


    function orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder) {
        driver
            .then(_ => driver.findElement(By.name('post_name')).clear())
            .then(_ => driver.findElement(By.name('post_name')).sendKeys(guestName))
            .then(_ => driver.findElement(By.name('post_last_name')).clear())
            .then(_ => driver.findElement(By.name('post_last_name')).sendKeys(guestLastName))
            .then(_ => driver.findElement(By.name('post_address')).clear())
            .then(_ => driver.findElement(By.name('post_address')).sendKeys(guestAddress))
            .then(_ => driver.findElement(By.name('post_flat')).clear())
            .then(_ => driver.findElement(By.name('post_flat')).sendKeys(guestFlatAddress))
            .then(_ => driver.findElement(By.name('post_index')).clear())
            .then(_ => driver.findElement(By.name('post_index')).sendKeys(guestPost))
            .then(_ => driver.findElement(By.name('post_city')).clear())
            .then(_ => driver.findElement(By.name('post_city')).sendKeys(guestCity))
            .then(_ => driver.findElement(By.name('post_phone')).clear())
            .then(_ => driver.findElement(By.name('post_phone')).sendKeys(guestPhone))
            .then(_ => driver.findElement(By.name('comment')).clear())
            .then(_ => driver.findElement(By.name('comment')).sendKeys(guestCommentToOrder))
    }

    this.canOrderProductAsGuestTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestCommentToOrder = 'Hello!';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };
    this.canChangeOrderAddressTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestCommentToOrder = 'Hello!';
        let guestMail = 'fake@test.com';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.holder-left .at-text-box:nth-child(1) a')).click())
            .then(_ => driver.findElement(By.name('post_address')).clear())
            .then(_ => driver.findElement(By.name('post_address')).sendKeys('Fkea St.191'))
            .then(_ => driver.findElement(By.name('post_flat')).clear())
            .then(_ => driver.findElement(By.name('post_flat')).sendKeys('34'))
            .then(_ => driver.findElement(By.name('post_index')).clear())
            .then(_ => driver.findElement(By.name('post_index')).sendKeys('34019'))
            .then(_ => driver.findElement(By.name('post_city')).clear())
            .then(_ => driver.findElement(By.name('post_city')).sendKeys('Wroclaw'))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };
    this.canChangeDeliveryMethodTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestCommentToOrder = 'Hello!';
        let guestMail = 'fake@test.com';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.holder-left .at-text-box:nth-child(2) a')).click())
            .then(_ => driver.findElement(By.css('.holder-right .radio-list li:nth-child(3)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };
    this.canChangeMyCommentInOrderTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestCommentToOrder = 'Hello!';
        let guestMail = 'fake@test.com';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.holder-left .at-text-box:nth-child(3) a')).click())
            .then(_ => driver.findElement(By.name('comment')).sendKeys('I changed my comment'))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };
    this.canChangePaymentMethodTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestCommentToOrder = 'Hello!';
        let guestMail = 'fake@test.com';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.holder-right .at-text-box:nth-child(1) a')).click())
            .then(_ => driver.findElement(By.css('.radio-list li:nth-child(1) div')).click())
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };
    this.canDoFakturaTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestMail = 'fake@test.com';
        let guestCommentToOrder = 'I can write e-mail for FAKTURA!';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };
    this.canSingForNewsletterTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestCommentToOrder = 'I can sign up for newsletter!';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.id('myCheckbox0')).click())
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };
    this.canRegisterHimInOrderTest = function () {
        let guestName = 'GuestNameFake';
        let guestLastName = 'GuestLastNameFake';
        let guestAddress = 'Fake St.19';
        let guestFlatAddress = '43';
        let guestPost = '43019';
        let guestCity = 'Breslau';
        let guestPhone = '789012345';
        let guestCommentToOrder = 'I can register myself on final stage of order!';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm(guestName, guestLastName, guestAddress, guestFlatAddress, guestPost, guestCity, guestPhone, guestCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.id('myCheckbox1')).click())
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };

    this.canOrderProductAsUserTest = function () {
        let userName = 'UserNameFake';
        let userLastName = 'UserLastNameFake';
        let userAddress = 'Fake St.19';
        let userFlatAddress = '43';
        let userPost = '43019';
        let userCity = 'Breslau';
        let userPhone = '789012345';
        let userCommentToOrder = 'Hello!';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('green')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk')))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Dostawa'), animationTimeTimeout))
            .then(_ => orderForm(userName, userLastName, userAddress, userFlatAddress, userPost, userCity, userPhone, userCommentToOrder))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.sleep(2000))
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
    };


    this.canSwitchLanguagesTest = function () {
        let titleSiteRU = 'Argish — натуральные масла и продукция из пантов марала';
        let titleSitePL = 'Argish - Olej naturalny i artykuły z pantów jelenia';
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.lang span')).click())
            .then(_ => driver.wait(until.titleIs(titleSiteRU)))
            .then(_ => driver.findElement(By.css('.lang span')).click())
            .then(_ => driver.wait(until.titleIs(titleSitePL)))
    };

    this.canVisitAboutUsTest = function () {
        let expectedAboutUsPageTitle = 'Sklep internetowy Argish — wszystko dla zdrowia.';
        return driver.get(site)
            .then(_ => driver.findElement(By.className('about-us')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.about-us-info')), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('h1')).getText())
            .then(aboutUsPageTitle => assert.equal(aboutUsPageTitle, expectedAboutUsPageTitle, 'can not see About Us page'))
    };
    this.canVisitContactPageTest = function () {
        let expectedContactPageTitle = 'Kontakt';
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.menu2:nth-child(3)')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.about-us-info')), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('h1')).getText())
            .then(contactPageTitle => assert.equal(contactPageTitle, expectedContactPageTitle, 'can not see Contact page'))
            .then(_ => driver.findElement(By.className('close-popup')).click())

    };
    this.canSeeProductsTest = function () {

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.menu1')).click())
            .then(_ => driver.findElements(By.className('item')))
            .then(productListData => {
                if (productListData.length > 0) {
                    displayResult('Success. There are Products in this category')
                }
                else {
                    displayResult('Fail. There is no Products in this category')
                }
            })

    };


};


module.exports = Product;