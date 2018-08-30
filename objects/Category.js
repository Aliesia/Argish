const assert = require('assert');
const {By, until} = require('selenium-webdriver');

const Category = function (site, driver, animationTimeTimeout = 5000) {

    this.createCategory = function (dummyPLcategoryName = 'pl_cat_test_' + Math.random().toString(36).substring(6),
                                    dummyRUcategoryName = 'ru_cat_test_' + Math.random().toString(36).substring(6)) {
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('legend label')))
            .then(legendsData => {
                if (legendsData.length === 0) {
                    return driver.get(site + '/cms/category/create')
                        .then(_ => driver.findElements(By.css('input')))
                        .then(inputs => inputs[1].sendKeys(dummyPLcategoryName))
                        .then(_ => driver.findElements(By.css('input')))
                        .then(inputs => inputs[0].sendKeys(dummyRUcategoryName))
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

    this.createSubCategory = function (dummyPLsubCategoryName = 'pl_scat_test_' + Math.random().toString(36).substring(6),
                                       dummyRUsubCategoryName = 'ru_scat_test_' + Math.random().toString(36).substring(6)) {
        
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.className('addListItem')).click())
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[1].sendKeys(dummyPLsubCategoryName))
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[0].sendKeys(dummyRUsubCategoryName))
            .then(_ => driver.findElement(By.css('button')).click())
            
    };

    this.deleteSubCategory = function () {
        return driver.get(site + '/cms/category')
            .then(_ => driver.findElements(By.css('fieldset label:nth-child(2)')))
            // .then(_ => driver.findElements(By.css('.categories fieldset label .sub:nth-child(2)')))
            .then(legendsData => {
                if (legendsData.length > 0) {
                    //legendsData[0].click().then(_ => driver.findElement(By.css('.categories fieldset label .sub:nth-child(2) img')).click())
                    legendsData[0].click().then(_ => driver.findElement(By.css('fieldset label:nth-child(2) img')).click())
                        .then(_ => driver.sleep(2000))
                        .then(_ => driver.findElement(By.className('careful')).click())
                        .then(_ => driver.wait(until.elementLocated(By.id('findelete')), animationTimeTimeout))
                        .then(_ => driver.findElement(By.className('red')).click());
                }
            })
    };

    };


module.exports = Category;