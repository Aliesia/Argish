const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const ProductObject = require('../../../objects/Product');
const displayResult = require('../../../objects/Helpers');

const productDefaultData ={
    language: 'pl',
    productName: 'Unique Name Of Product_' + Math.random().toString(36).substring(6),
    price: '123',
    quantity: '123',
    sku: '0123'
};

const ProductTests = function (site, driver, animationTimeTimeout = 5000) {

    let productObject = new ProductObject(site, driver);

    function fillForm(productData = productDefaultData) {
        return productObject.fillFormNewProduct(productData);
    }

    this.canCreateProductTest = function () {
        let expectedProductTitle = 'Основная информация о товаре';

        return driver.get(site + '/cms/product')
            .then(_ => driver.wait(until.titleIs('CMS: Список'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.button')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(newProductTitle => assert.equal(newProductTitle, expectedProductTitle, 'can not enter product creation page'))
            .then(_ => fillForm())
            .then(_ => driver.findElement(By.css('.categories > fieldset legend input')).click())
            .then(_ => driver.findElement(By.css('.publish > input')).click())
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.get(site + '/cms/product'))
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).getText())
            .then(productName => assert.equal(productName, productDefaultData.productName, 'can not see product in CMS products page'))

        //TODO:: 2. Make this test for Site only.
        /*.then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a span')).getText())
            .then(productName => assert.equal(productName, productDefaultData.productName, 'can not see product on Site category page'))
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.promo-info h1')).getText())
            .then(productName => assert.equal(productName, productDefaultData.productName, 'can not see proper product name on Site product page'))
    */};

    this.canEditProductTest = function () {

        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).click())
            .then(_ => fillForm())
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.wait(until.elementLocated(By.css('main .plate header nav > a:nth-of-type(2)')), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(2)')).click())
            .then(_ => driver.findElement(By.css('.maintitle')).getText())
            .then(productName => assert.equal(productName, productDefaultData.productName, 'can not see proper product in CMS description product page'))
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(3)')).click())
            .then(_ => driver.findElement(By.css('.wide label')).getText())
            .then(productName => assert.equal(productName, productDefaultData.productName, 'can not see proper product in CMS similar products page'))
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(4)')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(productName => {
                if (!productName.includes(productDefaultData.productName))
                    assert.fail(productDefaultData.productName, productName)
            })
            .then(_ => driver.findElement(By.css('main .plate header nav > a:nth-of-type(4) img')).click())
            .then(_ => driver.getAllWindowHandles())
            .then(handles => {
                driver.switchTo().window(handles[1])
                    .then(_ => driver.findElement(By.css('.promo-info h1')).getText())
                    .then(productName => assert.equal(productName, productDefaultData.productName))
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

    this.unpublishedProductTest = function () {
        return driver.get(site + '/cms/product')
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(5) img')).click())
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(5) img')).getAttribute('src'))
            .then(imgSrcData => {
                if (  !imgSrcData.includes('unpublished')  ){
                    assert.fail(imgSrcData, 'unpublished', 'Unpublishing has no effect')
                }
            })
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(5) img')).click())
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(5) img')).getAttribute('src'))
            .then(imgSrcData => {
                if (  !imgSrcData.includes('published')  ){
                    assert.fail(imgSrcData, 'published', 'Publishing has no effect')
                }
            })
        //TODO:: 3. Make this test for Site only.
           /* .then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a span')).getText())
            .then(productName => assert.notEqual(productName, uniqueNameOfProduct, 'can see product on site page, but visibility is off'))*/
    };

    this.absentSKUProductTest = function(uniqueNameOfProduct, uniqueIdOfProduct) {
        let productData = productDefaultData;
        productData.sku = '';
        return driver.get(site + '/cms/product')            
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product in CMS products page'))
            .then(_ => driver.findElement(By.css('tbody > tr:nth-child(1) > td:nth-child(2) a')).click())
            .then(_ => fillForm(productData))
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.findElement(By.name('sku')).getAttribute("value"))
            .then(editedProductSku => {
                assert.equal(uniqueIdOfProduct, editedProductSku, 'Unpropper(empty) ID was sa')
            })

        //TODO:: check SKU in Cart from Site.
            /*.then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a span')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see product on Site category page'))
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.promo-info h1')).getText())
            .then(productName => assert.equal(productName, uniqueNameOfProduct, 'can not see proper product name on Site product page'))
            .then(_ => driver.findElement(By.css('.add-cart .green')).click())
            .catch(_ => assert.fail('not green','green','Product can not be added, because there are no products in stock'))
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
            */
    };

};


module.exports = ProductTests;