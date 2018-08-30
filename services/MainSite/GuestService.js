const User = require('../../objects/User');
const ProductTests = require('../../tests/MainSite/ProductTests');
const ButtonTests = require('../../tests/MainSite/ButtonTests');
const Category = require('../../objects/Category');


const GuestService = function (site, driver) {

    let user = new User(site, driver);
    let productTests = new ProductTests(site, driver);
    let buttonTests = new ButtonTests(site, driver);
    let category = new Category(site, driver);

    this.canSwitchLanguages = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => buttonTests.canSwitchLanguagesTest())
    };
    this.canVisitAboutUs = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => buttonTests.canVisitAboutUsTest())
    };
    this.canVisitContactPage = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => buttonTests.canVisitContactPageTest())
    };
    this.canSeeProducts = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => productTests.canSeeProductsTest())
    };

};

module.exports = GuestService;
