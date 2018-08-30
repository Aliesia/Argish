const {describe, it, after, before} = require('selenium-webdriver/testing');
const {Builder} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const ProductService = require('../services/AdminPanel/FeatureServices/ProductService');
const ConfigService = require('../services/ConfigService');
const site = 'http://argish.loc/pl';

describe('library app scenarios', function () {
    this.timeout(50000);
    let productService;
    let configService;
    let driver;

    before(function () {
        let chromeOptions = new Chrome.Options();
        chromeOptions.addArguments('start-maximized');
        chromeOptions.addArguments('disable-infobars');
        driver = new Builder().withCapabilities(chromeOptions.toCapabilities()).build();
        productService = new ProductService(site, driver);
        configService = new ConfigService(site, driver);
        driver.get(site)
        .then(_ => configService.disableDebugbar())
        .then(_ => configService.disableCookies())


    });

    it('can create product page', function () {
        productService.canCreateProduct();
    });
    it('can edit product page', function () {
        productService.canEditProduct();
    });
    it('can delete product page', function () {
        productService.canDeleteProduct();
    });
    it('visibility has effect', function () {
        productService.unpublishedProduct();
    });
    it('quantity has effect', function () {
        productService.lowQuantityProduct();
    });

    after(function () {
        driver.quit(driver)
    });
});