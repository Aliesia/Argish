const {describe, it, after, before} = require('selenium-webdriver/testing');
const {Builder} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');

const CategoryService = require('../services/CategoryService');
const ProductService = require('../services/ProductService');
const ConfigService = require('../services/ConfigService');
const site = 'localhost:8000/pl';

describe('All tests scenarios', function () {
    this.timeout(50000);
    let categoryService;
    let productService;
    let configService;
    let driver;

    before(function () {
        let chromeOptions = new Chrome.Options();
        chromeOptions.addArguments('start-maximized');
        chromeOptions.addArguments('disable-infobars');
        driver = new Builder().withCapabilities(chromeOptions.toCapabilities()).build();
        categoryService = new CategoryService(site, driver);
        productService = new ProductService(site, driver);
        configService = new ConfigService(site, driver);
        driver.get(site).then(_ => configService.disableDebugbar())

    });

    it('can create category', function () {
        categoryService.canCreateCategory();
    });
    it('can delete category', function () {
        categoryService.canDeleteCategory();
    });
    it('can create sub-category', function () {
        categoryService.canCreateSubCategory();
    });
    it('can delete sub-category', function () {
        categoryService.canDeleteSubCategory();
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
    it('id has effect ', function () {
        productService.absentSKUProduct();
    });

    it('can add Product to Cart from Site', function () {
        productService.canAddProductToCart();
    });
    it('can remove Product from Cart on Site', function () {
         productService.canRemoveFromCartProduct();
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
    it('can change own comment in order', function(){
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