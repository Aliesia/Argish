const assert = require('assert');
const {By, until} = require('selenium-webdriver');

const CategoryFeatureTests = function (site, driver, animationTimeTimeout = 5000) {


    this.canCreateCategoryTest = function () {
        let expectedCategoryCreationTitleName = 'Редактирование категории';
        let expectedCategoryListTitleName = 'Категории товаров';
        let dummyPLcategoryName = 'pl_cat_test_' + Math.random().toString(36).substring(6);
        let dummyRUcategoryName = 'ru_cat_test_' + Math.random().toString(36).substring(6);

        return driver.get(site + '/cms/category')
            .then(_ => driver.findElement(By.className('category')).click())
            .then(_ => driver.findElement(By.className('mainTitle')).getText())
            .then(referenceCategoryCreationTitle => assert.equal(referenceCategoryCreationTitle, expectedCategoryCreationTitleName, 'Expected Category Creation page is not correct'))
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[1].sendKeys(dummyPLcategoryName))
            .then(_ => driver.findElements(By.css('input')))
            .then(inputs => inputs[0].sendKeys(dummyRUcategoryName))
            .then(_ => driver.findElement(By.css('button')).click())
            .then(_ => driver.findElement(By.className('mainTitle')).getText())
            .then(referenceCategoryListTitle => assert.equal(referenceCategoryListTitle, expectedCategoryListTitleName, 'Expected Category List page is not correct'))
            .then(_ => driver.findElement(By.css('legend label')).getText())
            .then(data => {
                if (!data.toLowerCase().includes(dummyPLcategoryName.toLowerCase())) {
                    assert.fail(data, dummyPLcategoryName, 'Can not find created category in CMS')
                }
            })
        //TODO:: 1. Make this test for Site only.
            /*.then(_ => driver.get(site))
            .then(_ => driver.findElement(By.css('.nav li a')).getText())
            .then(data => {
                if (!data.toLowerCase().includes(dummyPLcategoryName.toLowerCase())) {
                    assert.fail(data, dummyPLcategoryName, 'Can not find created category on Site')
                }
            })*/
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
};


module.exports = CategoryFeatureTests;