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

    it('id has effect ', function () {
        productService.absentSKUProduct();
    });
    it('can add Product to Cart from Site', function () {
        productService.canAddProductToCart();
    });
    it('can remove Product from Cart on Site', function () {
        productService.canRemoveFromCartProduct();
    });

    after(function () {
        driver.quit(driver)
    });
});