const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const displayResult = require('../../objects/Helpers');

const ProductTests = function (site, driver, animationTimeTimeout = 5000) {

    this.lowQuantityProductTest = function () {
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.className('gray')))
            .catch(function () {
                assert.fail('there is no such element on this page')
            });
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


module.exports = ProductTests;