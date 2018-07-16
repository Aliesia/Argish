const User = require('../objects/User');
const Product = require('../objects/Product');
const Category = require('../objects/Category');


const ProductService = function (site, driver) {

    let user = new User(site, driver);
    let product = new Product(site, driver);
    let category = new Category(site, driver);

    this.canCreateProduct = function () {

        driver
            .then(_ => user.asAdmin())
            .then(_ => category.deleteCategory())
            .then(_ => category.createCategory())

            .then(_ => product.canCreateProductTest())
    };
    this.canEditProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.createProduct())
            .then(_ => product.canEditProductTest())
    };
    this.canDeleteProduct = function () {

        driver
            .then(_ => user.asAdmin())
            .then(_ => product.createProduct())
            .then(_ => product.canDeleteProductTest());
    };

    this.unpublishedProduct = function () {
        let uniqueNameOfProduct = 'Unique Name Of Product_' + Math.random().toString(36).substring(7);

        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())
            .then(_ => product.createProduct(uniqueNameOfProduct))
            .then(_ => product.unpublishedProductTest(uniqueNameOfProduct));
    };

    this.lowQuantityProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())

            .then(_ => product.lowQuantityProductTest());
    };

    this.absentSKUProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())

            .then(_ => product.absentSKUProductTest());
    };

    this.canAddProductToCart = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())

            .then(_ => product.canAddProductToCartTest());
    };
    this.canRemoveFromCartProduct = function () {
        driver

            .then(_ => product.canAddToCart())
            .then(_ => product.canRemoveFromCartProductTest());
    };

    this.canOrderProductAsGuest = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canOrderProductAsGuestTest());
    };
    this.canOrderProductAsUser = function () {
        driver
            .then(_ => user.asUser())
            .then(_ => product.canOrderProductAsUserTest());
    };
    this.canChangeOrderAddress = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canChangeOrderAddressTest());
    };
    this.canChangeDeliveryMethod = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canChangeDeliveryMethodTest());
    };
    this.canChangeMyCommentInOrder = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canChangeMyCommentInOrderTest());
    };
    this.canChangePaymentMethod = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canChangePaymentMethodTest());
    };
    this.canDoFaktura = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canDoFakturaTest());
    };
    this.canSingForNewsletter = function () {
         driver
             .then(_ => user.asGuest())
             .then(_ => product.canSingForNewsletterTest());
    };
    this.canRegisterHimInOrder = function () {
        driver
            .then(_ => user.asGuest())
            .then(_ => product.canRegisterHimInOrderTest());
    };

};

module.exports = ProductService;