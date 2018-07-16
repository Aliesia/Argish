const User = require('../objects/User');
const Comment = require('../objects/Comment');
const Post = require('../objects/Post');
const Category = require('../objects/Category');
const Product = require('../objects/Product');
const Order = require('../objects/Order');


const CmsFunctionTestService = function (site, driver) {

    let user = new User(site, driver);
    let comment = new Comment(site, driver);
    let post = new Post(site, driver);
    let category = new Category(site, driver);
    let product = new Product(site, driver);
    let order = new Order(site, driver);

    this.canGetToCMSComments = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canGetToCMSCommentsTest())
    };

    this.canGoToSite = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canGoToSiteTest())
    };
    this.canCleanCache = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canCleanCacheTest())
    };
    this.canVisitLogs = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canVisitLogsTest())
    };
    this.canVisitShop = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canVisitShopTest())
    };
    this.canVisitPosts = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canVisitPostsTest())
    };
    this.canVisitSEOPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canVisitSEOPageTest())
    };

    this.canVisitCategoryPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canVisitCategoryPageTest())
    };
    this.canVisitProductsPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canVisitProductsPageTest())
    };
    this.canVisitOrdersPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canVisitOrdersPageTest())
    };
    this.canLogOut = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => comment.canLogOutTest())
    };


    this.canGetToCMSCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canGetToCMSCategoryTest())
    };

    this.canGoToSite1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canGoToSiteTest())
    };
    this.canCleanCache1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canCleanCacheTest())
    };
    this.canVisitLogs1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canVisitLogsTest())
    };
    this.canVisitShop1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canVisitShopTest())
    };
    this.canVisitPosts1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canVisitPostsTest())
    };
    this.canVisitSEOPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canVisitSEOPageTest())
    };
    this.canVisitCommentsPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canVisitCommentsPageTest())
    };
    this.canVisitProductsPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canVisitProductsPageTest())
    };
    this.canVisitOrdersPage1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canVisitOrdersPageTest())
    };
    this.canLogOut1 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.canLogOutTest())
    };

    this.canGetToCMSProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canGetToCMSProductTest())
    };
    this.canGoToSite2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canGoToSiteTest())
    };
    this.canCleanCache2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canCleanCacheTest())
    };
    this.canVisitLogs2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canVisitLogsTest())
    };
    this.canVisitShop2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canVisitShopTest())
    };
    this.canVisitPosts2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canVisitPostsTest())
    };
    this.canVisitSEOPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canVisitSEOPageTest())
    };
    this.canVisitCommentsPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canVisitCommentsPageTest())
    };
    this.canVisitCategoryPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canVisitCategoryPageTest())
    };
    this.canVisitOrdersPage2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canVisitOrdersPageTest())
    };
    this.canLogOut2 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.canLogOutTest())
    };
    
    this.canGetToCMSOrder = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canGetToCMSOrderTest())
    };

    this.canVisitShop3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canVisitShopTest())
    };
    this.canVisitPosts3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canVisitPostsTest())
    };
    this.canVisitSEOPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canVisitSEOPageTest())
    };
    this.canVisitCommentsPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canVisitCommentsPageTest())
    };
    this.canVisitCategoryPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canVisitCategoryPageTest())
    };
    this.canVisitProductPage3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canVisitProductPageTest())
    };
    this.canVisitAboutUsPage = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canVisitAboutUsPageTest())
    };
    this.canLogOut3 = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => order.canLogOutTest())
    };


};

module.exports = CmsFunctionTestService;