const User = require('../../../objects/User');
const Product = require('../../../objects/Product');
const Category = require('../../../objects/Category');
const ProductTests = require('../../../tests/MainSite/ProductTests');
const ProductButtonTests = require ('../../../tests/AdminPanel/ButtonTests/ProductButtonTests');
const ProductFeatureTests = require ('../../../tests/AdminPanel/FeatureTests/ProductFeatureTests');


const ProductService = function (site, driver) {
    let user = new User(site, driver);
    let product = new Product(site, driver);
    let category = new Category(site, driver);
    let productTests = new ProductTests(site, driver);
    let productButtonTests = new ProductButtonTests (site, driver);
    let productFeatureTests = new ProductFeatureTests (site, driver);

    this.canCreateProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.deleteCategory())
            .then(_ => category.createCategory())
            .then(_ => productFeatureTests.canCreateProductTest())
    };
    
    this.canEditProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.createProduct())
            .then(_ => productFeatureTests.canEditProductTest())
    };
    
    this.canDeleteProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.createProduct())
            .then(_ => productFeatureTests.canDeleteProductTest());
    };

    this.unpublishedProduct = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())
            .then(_ => product.createProduct())
            .then(_ => productFeatureTests.unpublishedProductTest());
    };

    this.lowQuantityProduct = function () {
        let uniqueNameOfProduct = 'Unique Name Of Product_' + Math.random().toString(36).substring(7);
        let uniquePriceOfProduct = '123';
        let uniqueQuantityOfProduct = '0';
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())
            .then(_ => product.createProduct(uniqueNameOfProduct, uniqueNameOfProduct, uniquePriceOfProduct, uniqueQuantityOfProduct))
            .then(_ => productTests.lowQuantityProductTest());
    };

    this.absentSKUProduct = function () {
        let expectedProductTitle = 'Основная информация о товаре';
        let uniqueNameOfProduct = 'Unique Name Of Product_' + Math.random().toString(36).substring(7);
        let uniquePriceOfProduct = '123';
        let uniqueQuantityOfProduct = '123';
        let uniqueIdOfProduct = '4444';
        driver
            .then(_ => user.asAdmin())
            .then(_ => product.createProduct(uniqueNameOfProduct,'somedummyRu', uniquePriceOfProduct, uniqueQuantityOfProduct, uniqueIdOfProduct))
            .then(_ => productFeatureTests.absentSKUProductTest(uniqueNameOfProduct, uniqueIdOfProduct));
    };
};

module.exports = ProductService;
