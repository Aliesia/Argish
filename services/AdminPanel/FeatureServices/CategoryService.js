const User = require('../../../objects/User');
const Category = require('../../../objects/Category');
const CategoryButtonTests = require('../../../tests/AdminPanel/ButtonTests/CategoryButtonTests');
const CategoryFeatureTests = require('../../../tests/AdminPanel/FeatureTests/CategoryFeatureTests');

//const subCategory = require ('../objects/subCategory');

const CategoryService = function (site, driver) {
    let user = new User(site, driver);
    let category = new Category(site, driver);
    let categoryButtonTests = new CategoryButtonTests(site, driver);
    let categoryFeatureTests = new CategoryFeatureTests(site, driver);


    this.canCreateCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.deleteCategory())

            .then(_ => categoryFeatureTests.canCreateCategoryTest())
    };

    this.canDeleteCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())

            .then(_ => categoryFeatureTests.canDeleteCategoryTest())
    };
    //TODO: canCreateSubCategoryTest, canDeleteSubCategoryTest
 /*   this.canCreateSubCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())

            .then(_ => categoryFeatureTests.canCreateSubCategoryTest())
    };

    this.canDeleteSubCategory = function () {
        driver
            .then(_ => user.asAdmin())
            .then(_ => category.createCategory())
            .then(_ => category.createSubCategory())
            .then(_ => categoryFeatureTests.canDeleteSubCategoryTest())
    };*/

};

/*const SubCategoryService = function (site, driver) {
    this.canCreateSubCategory = function (){
        let user = new User (site, driver);
        let subCategory = new subCategory (site, driver);
        driver
            .then(_ => user.asAdmin())
            .then(_ => subcategory.deletesubCategory())

            .then(_ => subcategory.canCreatesubCategoryTest());
    };
};*/

module.exports = CategoryService;