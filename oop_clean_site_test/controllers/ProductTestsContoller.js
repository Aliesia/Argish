const {describe, it, after, before} = require('selenium-webdriver/testing');
const {Builder} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const ProductService = require('../services/ProductService');
const ConfigService = require('../services/ConfigService');
const site = 'localhost:8000/pl';

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
        driver.get(site).then(_ => configService.disableDebugbar())

    });

    it('can create product', function () {
        productService.canCreateProduct();
    });
    it('can edit product', function () {
        productService.canEditProduct();
    });
    it('can delete product', function () {
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