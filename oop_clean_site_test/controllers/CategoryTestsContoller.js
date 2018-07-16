const {describe, it, after, before} = require('selenium-webdriver/testing');
const {Builder} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const CategoryService = require('../services/CategoryService');
const ConfigService = require('../services/ConfigService');
const site = 'localhost:8000/pl';

describe('library app scenarios', function () {
    this.timeout(50000);
    let categoryService;
    let configService;
    let driver;

    before(function () {
        let chromeOptions = new Chrome.Options();
        chromeOptions.addArguments('start-maximized');
        chromeOptions.addArguments('disable-infobars');
        driver = new Builder().withCapabilities(chromeOptions.toCapabilities()).build();
        categoryService = new CategoryService(site, driver);
        configService = new ConfigService(site, driver);
        driver.get(site).then(_ => configService.disableDebugbar())

    });

    it('can create category page', function () {
        categoryService.canCreateCategory();
    });
    it('can delete category page', function () {
        categoryService.canDeleteCategory();
    });
    it('can create sub-category page', function () {
        categoryService.canCreateSubCategory();
    });
    it('can delete sub-category page', function () {
        categoryService.canDeleteSubCategory();
    });

    after(function () {
        driver.quit(driver)
    });
});