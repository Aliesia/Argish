const User = require('../../../objects/User');
const Post = require('../../../objects/Post');

const PostButtonService = function (site, driver) {
    let user = new User(site, driver);
    let post = new Post(site, driver);
//TODO:: All tests for Post!
    /*
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
module.exports = PostButtonService;