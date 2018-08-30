const {describe, it, after, before} = require('selenium-webdriver/testing');
const {Builder} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');

const CategoryService = require('../services/AdminPanel/FeatureServices/CategoryService');
const ProductService = require('../services/AdminPanel/FeatureServices/ProductService');
const OrderService = require('../services/MainSite/OrderService');
const ConfigService = require('../services/ConfigService');
const site = 'http://argish.loc/pl';

describe('Category functionality tests', function () {
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
        driver.get(site)
        .then(_ => configService.disableDebugbar())
        .then(_ => configService.disableCookies())

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
describe('Product functionality tests', function () {
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
    it('id has effect ', function () {
        productService.absentSKUProduct();
    });

    after(function () {
        driver.quit(driver)
    });
});
describe('Orders functionality tests', function () {
    this.timeout(50000);
    let orderService;
    let configService;
    let driver;

    before(function () {
        let chromeOptions = new Chrome.Options();
        chromeOptions.addArguments('start-maximized');
        chromeOptions.addArguments('disable-infobars');
        driver = new Builder().withCapabilities(chromeOptions.toCapabilities()).build();
        orderService = new OrderService(site, driver);
        configService = new ConfigService(site, driver);
        driver.get(site)
            .then(_ => configService.disableDebugbar())
            .then(_ => configService.disableCookies())

    });

    it('can add Product to Cart from Site', function () {
        orderService.canAddProductToCart();
    });
    it('can remove Product from Cart on Site', function () {
        orderService.canRemoveFromCartProduct();
    });
    it('guest can order Product from Site', function () {
        orderService.canOrderProductAsGuest();
    });
    it('can change address for delivery in order', function () {
        orderService.canChangeOrderAddress();
    });
    it('can change delivery method in order', function () {
        orderService.canChangeDeliveryMethod();
    });
    it('can change own comment in order', function(){
        orderService.canChangeMyCommentInOrder();
    });
    it('can change payment method in order', function () {
        orderService.canChangePaymentMethod();
    });
    it('can write e-mail for a bill in order', function () {
        orderService.canDoBill();
    });
    it('can sign up for newsletter in order', function () {
        orderService.canSingForNewsletter();
    });
    it('can register himself on final stage in order', function () {
        orderService.canRegisterHimInOrder();
    });
    it('user can order Product from Site', function () {
        orderService.canOrderProductAsUser();
    });

    after(function () {
        driver.quit(driver)
    });
});