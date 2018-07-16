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

    it('guest can make order of Product from Site', function () {
        productService.canOrderProductAsGuest();
    });
    it('can change address for delivery in order', function () {
        productService.canChangeOrderAddress();
    });
    it('can change delivery method in order', function () {
        productService.canChangeDeliveryMethod();
    });
    it('can change own comment in order', function () {
        productService.canChangeMyCommentInOrder();
    });
    it('can change payment method in order', function () {
        productService.canChangePaymentMethod();
    });
    it('can write e-mail for FAKTURA in order', function () {
        productService.canDoFaktura();
    });
    it('can sign up for newsletter in order', function () {
        productService.canSingForNewsletter();
    });
    it('can register himself on final step in order', function () {
        productService.canRegisterHimInOrder();
    });
    it('user can make order of Product from Site', function () {
        productService.canOrderProductAsUser();
    });

    after(function () {
        driver.quit(driver)
    });
});