const User = require('../../../objects/User');
const CommentButtonTests = require('../../../tests/AdminPanel/ButtonTests/CommentButtonTests');

const CommentButtonService = function (site, driver) {
    let user = new User(site, driver);
    let commentButtonTests = new CommentButtonTests(site, driver);

    this.canGetToCMSComments = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canGetToCMSCommentsTest())
    };
    this.canGoToSite = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canGoToSiteTest())
    };
    this.canCleanCache = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canCleanCacheTest())
    };
    this.canVisitLogs = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canVisitLogsTest())
    };
    this.canVisitShop = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canVisitShopTest())
    };
    this.canVisitPosts = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canVisitPostsTest())
    };
    this.canVisitSEOPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canVisitSEOPageTest())
    };
    this.canVisitCategoryPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canVisitCategoryPageTest())
    };
    this.canVisitProductsPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canVisitProductsPageTest())
    };
    this.canVisitOrdersPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canVisitOrdersPageTest())
    };
    this.canLogOut = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canLogOutTest())
    };

    //TODO:: tests canClickCategoriesButton,canClickProductsButton, canClickOrdersButton
    /*this.canClickCategoriesButton = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canClickCategoriesButtonTest())
    };
    this.canClickProductsButton = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canClickProductsButtonTest())
    };
    this.canClickOrdersButton = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => commentButtonTests.canClickOrdersButtonTest())
    };*/
};

module.exports = CommentButtonService;