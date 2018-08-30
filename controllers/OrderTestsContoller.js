const {describe, it, after, before} = require('selenium-webdriver/testing');
const {Builder} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const OrderService = require('../services/MainSite/OrderService');
const ConfigService = require('../services/ConfigService');
const site = 'http://argish.loc/pl';

describe('library app scenarios', function () {
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

    it('guest can order Product from Site', function () {
        orderService.canOrderProductAsGuest();
    });
    it('can change address for delivery in order', function () {
        orderService.canChangeOrderAddress();
    });
    it('can change delivery method in order', function () {
        orderService.canChangeDeliveryMethod();
    });
    it('can change own comment in order', function () {
        orderService.canChangeMyCommentInOrder();
    });

   /* TODO:
        it('can change payment method in order', function () {
        orderService.canChangePaymentMethod();
    });*/
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