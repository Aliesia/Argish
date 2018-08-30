const assert = require('assert');
const {By, until} = require('selenium-webdriver');

const PostFeatureTests = function (site, driver, animationTimeTimeout = 5000) {

    this.canCreatePostTest = function () {
        let expectednewPostTitle = 'Статьи : Новая статья';
        let postTitle = 'Title_' + Math.random().toString(36).substring(5);
        let expectedPostsPageTitle = 'Статьи';


        return driver.get(site + '/cms/posts')
            .then(_ => driver.findElement(By.className('phpdebugbar-close-btn')).click())
            .then(_ => driver.findElement(By.className('button')).click())
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(newPostTitle => assert.equal(newPostTitle, expectednewPostTitle, 'can not enter new Posts page'))

            .then(_ => driver.findElement(By.name('title')).sendKeys(postTitle))
            .then(_ => driver.findElement(By.name('slug')).sendKeys('URL'))
            .then(_ => driver.findElement(By.name('text1')).sendKeys('Post_text'))
            .then(_ => driver.findElement(By.name('text2')).sendKeys('Picture1'))
            .then(_ => driver.findElement(By.name('text3')).sendKeys('Picture2'))

            .then(_ => driver.findElement(By.name('product_title')).sendKeys('Title1_1'))
            .then(_ => driver.findElement(By.name('product_description')).sendKeys('Description'))
            .then(_ => driver.findElement(By.name('product_button')).sendKeys('ButtonName'))
            .then(_ => driver.findElement(By.name('product_url')).sendKeys('http//'))
            .then(_ => driver.findElement(By.name('product_button_title')).sendKeys('tip_to_button'))

            .then(_ => driver.findElement(By.id('art6')).sendKeys('123'))
            // .then(_ => driver.findElement(By.name('background_img_ready')).click())
            //.then(_ => driver.findElement(By.name('background_mobile_img_ready')).click())
            //  .then(_ => driver.findElement(By.name('post_img_1_ready')).click())
            // .then(_ => driver.findElement(By.name('post_img_2_ready')).click())

            .then(_ => driver.findElement(By.css('.solo input:nth-of-type(2)')).click())
            .then(_ => driver.findElement(By.css('.cf .dropcheck')).click())
            .then(_ => driver.findElement(By.css('.publish')).click())
            .then(_ => driver.findElement(By.css('form')).submit())
            .then(_ => driver.get(site + '/cms/posts'))
            .then(_ => driver.findElement(By.css('.mainTitle')).getText())
            .then(postsPageTitle => assert.equal(postsPageTitle, expectedPostsPageTitle, 'can not enter CMS Posts page'))
            .then(_ => driver.findElement(By.css('.itemlist a > span')).getText())
            .then(referencePostTitle => {
                if (!postTitle.includes(referencePostTitle))
                    assert.fail(referencePostTitle, postTitle)
            });
    };


};

module.exports = PostFeatureTests;