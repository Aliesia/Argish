const {describe, it, after, before} = require('selenium-webdriver/testing');
const {Builder} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');

const CmsFunctionTestService = require('../services/AdminPanel/ButtonServices/CmsFunctionTestService');
const GuestService = require('../services/MainSite/GuestService');
const ConfigService = require('../services/ConfigService');
const site = 'http://argish.loc/pl';

describe('library app scenarios', function () {
    this.timeout(50000);
    let functionTest;
    let guestService;
    let configService;
    let driver;

    before(function () {
        let chromeOptions = new Chrome.Options();
        chromeOptions.addArguments('start-maximized');
        chromeOptions.addArguments('disable-infobars');
        driver = new Builder().withCapabilities(chromeOptions.toCapabilities()).build();
        functionTest = new CmsFunctionTestService(site, driver);
        guestService = new GuestService(site, driver);
        configService = new ConfigService(site, driver);
        driver.get(site)
        .then(_ => configService.disableDebugbar())
        .then(_ => configService.disableCookies())

    });

    it('can get on CMS Comments page', function () {
        functionTest.canGetToCMSComments();
    });
    it('can click GoToSite button on CMS Comments page', function () {
        functionTest.canGoToSite();
    });
    it('can clean cache on CMS Comments page', function () {
        functionTest.canCleanCache();
    });
    it('can visit Logs page from  CMS Comments page', function () {
        functionTest.canVisitLogs();
    });
    it('can visit Shop page from  CMS Comments page', function () {
        functionTest.canVisitShop();
    });
    it('can visit Post page from CMS Comments page', function () {
        functionTest.canVisitPosts();
    });
    it('can visit SEO page from CMS Comments page', function () {
        functionTest.canVisitSEOPage();
    });
    it('can go to Category page from CMS Comments page', function () {
        functionTest.canVisitCategoryPage();
    });
    it('can go to Products page from CMS Comments page', function () {
        functionTest.canVisitProductsPage();
    });
    it('can go to Orders page from CMS Comments page', function () {
        functionTest.canVisitOrdersPage();
    });
    it('can log out from CMS Comments page', function () {
        functionTest.canLogOut();
    });
    /*it('can create Post in CMS', function () {
        functionTest.canCreatePost();
      it('can edit Post in CMS', function () {
        functionTest.canEditPost();
      it('can delete Post in CMS', function () {
        functionTest.canDeletePost();
    });*/


    it('can get on CMS Category page', function () {
        functionTest.canGetToCMSCategory();
    });
    it('can click GoToSite button on CMS Category page', function () {
        functionTest.canGoToSite1();
    });
    it('can clean cache on CMS Category page', function () {
        functionTest.canCleanCache1();
    });
    it('can visit Logs page from  CMS Category page', function () {
        functionTest.canVisitLogs1();
    });
    it('can visit Shop page from  CMS Category page', function () {
        functionTest.canVisitShop1();
    });
    it('can visit Post page from CMS Category page', function () {
        functionTest.canVisitPosts1();
    });
    it('can visit SEO page from CMS Category page', function () {
        functionTest.canVisitSEOPage1();
    });
    it('can go to Comments page from CMS Category page', function () {
        functionTest.canVisitCommentsPage1();
    });
    it('can go to Products page from CMS Category page', function () {
        functionTest.canVisitProductsPage1();
    });
    it('can go to Orders page from CMS Category page', function () {
        functionTest.canVisitOrdersPage1();
    });
    it('can log out from CMS Category page', function () {
        functionTest.canLogOut1();
    });
    /*it('can create Category in CMS', function () {
        functionTest.canCreateCategory();
      it('can edit Category in CMS', function () {
        functionTest.canEditCategory();
      it('can delete Category in CMS', function () {
        functionTest.canDeleteCategory();

      it('can create subCategory in CMS', function () {
        functionTest.canCreateSubCategory();
      it('can edit subCategory in CMS', function () {
        functionTest.canEditSubCategory();
      it('can delete subCategory in CMS', function () {
        functionTest.canDeleteSubCategory();
            });*/


    it('can get on CMS Product page', function () {
        functionTest.canGetToCMSProduct();
    });
    it('can click GoToSite button on CMS Product page', function () {
        functionTest.canGoToSite2();
    });
    it('can clean cache on CMS Product page', function () {
        functionTest.canCleanCache2();
    });
    it('can visit Logs page from  CMS Product page', function () {
        functionTest.canVisitLogs2();
    });
    it('can visit Shop page from  CMS Product page', function () {
        functionTest.canVisitShop2();
    });
    it('can visit Post page from CMS Product page', function () {
        functionTest.canVisitPosts2();
    });
    it('can visit SEO page from CMS Product page', function () {
        functionTest.canVisitSEOPage2();
    });
    it('can go to Comments page from CMS Product page', function () {
        functionTest.canVisitCommentsPage2();
    });
    it('can go to Category page from CMS Product page', function () {
        functionTest.canVisitCategoryPage2();
    });
    it('can go to Orders page from CMS Product page', function () {
        functionTest.canVisitOrdersPage2();
    });
    it('can log out from CMS Product page', function () {
        functionTest.canLogOut2();
    });

    /*it('can create Product in CMS', function () {
        functionTest.canCreateProduct();
      it('can edit Product in CMS', function () {
        functionTest.canEditProduct();
      it('can delete Product in CMS', function () {
        functionTest.canDeleteProduct();
        });*/


    it('can get on CMS Order page', function () {
        functionTest.canGetToCMSOrder();
    });
    it('can visit Shop page from  CMS Order page', function () {
        functionTest.canVisitShop3();
    });
    it('can visit Post page from CMS Order page', function () {
        functionTest.canVisitPosts3();
    });
    it('can visit SEO page from CMS Order page', function () {
        functionTest.canVisitSEOPage3();
    });
    it('can go to Comments page from CMS Order page', function () {
        functionTest.canVisitCommentsPage3();
    });
    it('can go to Category page from CMS Order page', function () {
        functionTest.canVisitCategoryPage3();
    });
    it('can go to Product page from CMS Order page', function () {
        functionTest.canVisitProductPage3();
    });
    it('can go to AboutUs page from CMS Order page', function () {
        functionTest.canVisitAboutUsPage();
    });
    it('can log out from CMS Order page', function () {
        functionTest.canLogOut3();
    });

    it('can switch languages', function () {
        guestService.canSwitchLanguages();
    });
    it('can go to AboutUs', function () {
        guestService.canVisitAboutUs();
    });
    it('can go to Contact Page', function () {
        guestService.canVisitContactPage();
    });
    it('can see Products in category', function () {
        guestService.canSeeProducts();
    });


    after(function () {
        driver.quit(driver)
    });
});