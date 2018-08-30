const assert = require('assert');
const {By, until} = require('selenium-webdriver');

const Post = function (site, driver, animationTimeTimeout = 5000) {

    //TODO:: Make test canCreatePost
    //this.canCreatePost = function () {};
    this.canEditPost = function () {
        return driver.get(site + '/cms/posts')
            .then(_ => driver.findElement(By.css('.itemlist a > span')).click())
            .then(_ => driver.findElement(By.css('.trumbowyg-viewHTML-button')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.trumbowyg-viewHTML-button .trumbowyg-active')), animationTimeTimeout))
            .then(_ => driver.findElement(By.className('trumbowyg-bold-button '))
            )
    };
    //TODO:: Make test canDeletePost
    // this.canDeletePost = function () {};

};

module.exports = Post;