const User = require('../../objects/User');
const Product = require('../../objects/Product');
const Category = require('../../objects/Category');
const OrderObject = require('../../objects/Order');
const OrderTests = require('../../tests/MainSite/OrderTests');

const OrderService = function (site, driver) {
    let userObject = new User(site, driver);
    let productObject = new Product(site, driver);
    let categoryObject = new Category(site, driver);
    let orderObject = new OrderObject (site, driver);
    let orderTests = new OrderTests (site, driver);

    this.canAddProductToCart = function () {
        driver
            .then(_ => userObject.asAdmin())
            .then(_ => categoryObject.createCategory())
            .then(_ => productObject.createProduct())
            .then(_ => orderTests.canAddProductToCartTest());
    };
    this.canRemoveFromCartProduct = function () {
        driver

            .then(_ => orderTests.canRemoveFromCartProductTest());
    };
    this.canOrderProductAsGuest = function () {
        driver
            .then(_ => userObject.asGuest())
            .then(_ => orderTests.canOrderProductAsGuestTest());
    };
    this.canOrderProductAsUser = function () {
        driver
            .then(_ => userObject.asUser())
            .then(_ => orderTests.canOrderProductAsUserTest());
    };
    this.canChangeOrderAddress = function () {
        driver
            .then(_ => userObject.asGuest())
            .then(_ => orderTests.canChangeOrderAddressTest());
    };
    this.canChangeDeliveryMethod = function () {
        driver
            .then(_ => userObject.asGuest())
            .then(_ => orderTests.canChangeDeliveryMethodTest());
    };
    this.canChangeMyCommentInOrder = function () {
        driver
            .then(_ => userObject.asGuest())
            .then(_ => orderTests.canChangeMyCommentInOrderTest());
    };
    this.canChangePaymentMethod = function () {
        driver
            .then(_ => userObject.asGuest())
            .then(_ => orderTests.canChangePaymentMethodTest());
    };
    this.canDoBill = function () {
        driver
            .then(_ => userObject.asGuest())
            .then(_ => orderTests.canDoBillTest());
    };
    this.canSingForNewsletter = function () {
         driver
             .then(_ => userObject.asGuest())
             .then(_ => orderTests.canSingForNewsletterTest());
    };
    this.canRegisterHimInOrder = function () {
        driver
            .then(_ => userObject.asGuest())
            .then(_ => orderTests.canRegisterHimInOrderTest());
    };

};

module.exports = OrderService;

//TODO:: published has effect (checkbox/published-unpublished)
//TODO:: quantity has effect (field in/or not quantity of product)
//TODO:: id of proper product (field in is not id of product)
