const User = require('../objects/User');
const Category = require('../objects/Category');

const CategoryService = function (site, driver) {
    let user = new User(site, driver);
    let category = new Category(site, driver);

    this.canCreateCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.deleteCategory())

            .then(_ => category.canCreateCategoryTest())
    };

    this.canDeleteCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())

            .then(_ => category.canDeleteCategoryTest())
    };
    this.canCreateSubCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())
            .then(_ => category.deleteSubCategory())

            .then(_ => category.canCreateSubCategoryTest())
    };

    this.canDeleteSubCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())
            .then(_ => category.createSubCategory())
            .then(_ => category.canDeleteSubCategoryTest())
    };

};

module.exports = CategoryService;