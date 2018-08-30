const User = require('../../../objects/User');
const Post = require('../../../objects/Post');
const Order = require('../../../objects/Order');
const CategoryButtonTests = require('../../../tests/AdminPanel/ButtonTests/CategoryButtonTests');
const ProductButtonTests = require('../../../tests/AdminPanel/ButtonTests/ProductButtonTests');
const CommentButtonTests = require('../../../tests/AdminPanel/ButtonTests/CommentButtonTests');
const OrderButtonTests = require('../../../tests/AdminPanel/ButtonTests/OrderButtonTests');


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

const CmsCommentButtonService = function (site, driver) {

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

const CmsOrderButtonService = function (site, driver) {

    let user = new User(site, driver);
    let orderButtonTests = new OrderButtonTests (site, driver);
    let order = new Order(site, driver);

    this.canVisitShop3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canVisitShopTest())
    };
    this.canVisitPosts3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canVisitPostsTest())
    };
    this.canVisitSEOPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canVisitSEOPageTest())
    };
    this.canVisitCommentsPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canVisitCommentsPageTest())
    };
    this.canVisitCategoryPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canVisitCategoryPageTest())
    };
    this.canVisitProductPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canVisitProductPageTest())
    };
    this.canVisitAboutUsPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canVisitAboutUsPageTest())
    };
    this.canLogOut3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => orderButtonTests.canLogOutTest())
    };

};

const PostButtonService = function (site, driver) {

    let user = new User(site, driver);
    let post = new Post(site, driver);
//TODO:: Tests canCreatePost
    /*this.canCreatePost = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canCreatePostTest())
    };
    this.canEditPost = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canEditPostTest())
    };
    this.canDeletePost = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canDeletePostTest())
    };
    this.canCleanCash= function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canGoCleanCashTest())
    };
    this.canGotoSite = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canGoToSiteTest())
    };
    this.canVisitShop4 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canVisitShopTest())
    };
    this.canVisitPosts4 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canVisitPostsTest())
    };
    this.canVisitSEOPage4 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canVisitSEOPageTest())
    };
    this.canLogOut4 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => post.canLogOutTest())
    };
    */


};
module.exports = FunctionTestService;