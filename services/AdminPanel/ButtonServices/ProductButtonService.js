const User = require('../../../objects/User');
const ProductButtonTests = require('../../../tests/AdminPanel/ButtonTests/ProductButtonTests');

const ProductButtonService = function (site, driver) {
    let user = new User(site, driver);
    let productButtonTests = new ProductButtonTests(site, driver);

    this.canGetToCMSProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canGetToCMSProductTest())
    };
    this.canGoToSite2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canGoToSiteTest())
    };
    this.canCleanCache2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canCleanCacheTest())
    };
    this.canVisitLogs2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canVisitLogsTest())
    };
    this.canVisitShop2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canVisitShopTest())
    };
    this.canVisitPosts2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canVisitPostsTest())
    };
    this.canVisitSEOPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canVisitSEOPageTest())
    };
    this.canVisitCommentsPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canVisitCommentsPageTest())
    };
    this.canVisitCategoryPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canVisitCategoryPageTest())
    };
    this.canVisitOrdersPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canVisitOrdersPageTest())
    };
    this.canLogOut2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => productButtonTests.canLogOutTest())
    };
};

module.exports = ProductButtonService;