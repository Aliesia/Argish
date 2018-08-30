const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const displayResult = require('./Helpers');

let orderDefaultData = {
    guestName:'GuestNameFake',
    guestLastName: 'GuestLastNameFake',
    guestAddress: 'Fake St.19',
    guestFlatAddress: '43',
    guestPost: '43019',
    guestCity: 'Breslau',
    guestPhone: '789012345',
    guestCommentToOrder: 'Hello!'
};
let productDefaultData ={
    language: 'pl',
    productName: 'pl_prod_test_' + Math.random().toString(36).substring(6),
    price: '123',
    quantity: '123',
    sku: '0123'
};

const Product = function (site, driver, animationTimeTimeout = 5000) {



    this.fillFormNewProduct = function (productData = productDefaultData) {
        driver
            .then(_ => driver.findElement(By.name('trans[' + productData.language + '][name]')).clear())
            .then(_ => driver.findElement(By.name('trans[' + productData.language + '][name]')).sendKeys(productData.productName))
            .then(_ => driver.findElement(By.name('price')).clear())
            .then(_ => driver.findElement(By.name('price')).sendKeys(productData.price))
            .then(_ => driver.findElement(By.name('quantity')).clear())
            .then(_ => driver.findElement(By.name('quantity')).sendKeys(productData.quantity))
            .then(_ => driver.findElement(By.name('sku')).clear())
            .then(_ => driver.findElement(By.name('sku')).sendKeys(productData.sku))
    };

    this.createProduct = function (productData = productDefaultData) {

        return driver.get(site + '/cms/product/create')
            .then(_ => this.fillFormNewProduct(productData))
            .then(_ => driver.findElement(By.css('.categories > fieldset legend input')).click())
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
};

module.exports = Product;