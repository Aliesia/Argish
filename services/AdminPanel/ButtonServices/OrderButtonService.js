const User = require('../../../objects/User');
const OrderButtonTests = require('../../../tests/AdminPanel/ButtonTests/OrderButtonTests');


const OrderButtonService = function (site, driver) {
    let user = new User(site, driver);
    let orderButtonTests = new OrderButtonTests (site, driver);

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

module.exports = OrderButtonService;