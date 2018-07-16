const User = require('../objects/User');
const Product = require('../objects/Product');
const Category = require('../objects/Category');


const GuestService = function (site, driver) {

    let user = new User(site, driver);
    let product = new Product(site, driver);
    let category = new Category(site, driver);

    this.canSwitchLanguages = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canSwitchLanguagesTest())
    };
    this.canVisitAboutUs = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canVisitAboutUsTest())
    };
    this.canVisitContactPage = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canVisitContactPageTest())
    };
    this.canSeeProducts = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canSeeProductsTest())
    };

};

module.exports = GuestService;