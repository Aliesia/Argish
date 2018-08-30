const User = require('../../../objects/User');
const CategoryButtonTests = require('../../../tests/AdminPanel/ButtonTests/CategoryButtonTests');

const CategoryButtonService = function (site, driver) {
    let user = new User(site, driver);
    let categoryButtonTests = new CategoryButtonTests(site, driver);

    this.canGetToCMSCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canGetToCMSCategoryTest())
    };

    this.canGoToSite1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canGoToSiteTest())
    };
    this.canCleanCache1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canCleanCacheTest())
    };
    this.canVisitLogs1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canVisitLogsTest())
    };
    this.canVisitShop1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canVisitShopTest())
    };
    this.canVisitPosts1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canVisitPostsTest())
    };
    this.canVisitSEOPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canVisitSEOPageTest())
    };
    this.canVisitCommentsPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canVisitCommentsPageTest())
    };
    this.canVisitProductsPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canVisitProductsPageTest())
    };
    this.canVisitOrdersPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canVisitOrdersPageTest())
    };
    this.canLogOut1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => categoryButtonTests.canLogOutTest())
    };
};
module.exports = CategoryButtonService;