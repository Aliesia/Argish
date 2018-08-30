const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const displayResult = require('../../objects/Helpers');

const ButtonTests = function (site, driver, animationTimeTimeout = 5000) {

    this.canSwitchLanguagesTest = function () {
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.lang span')).click())
            .then(_ => driver.findElement(By.css('.lang a')).getAttribute('title'))
            .then(siteLanguage => assert.equal(siteLanguage, 'Polski', 'language is not PL'))
            .then(_ => driver.findElement(By.css('.lang span')).click())
            .then(_ => driver.findElement(By.css('.lang a')).getAttribute('title'))
            .then(siteLanguage => assert.equal(siteLanguage, 'Русский', 'language is not RU'))
    };

    this.canVisitAboutUsTest = function () {
        let expectedAboutUsPageTitle = 'Sklep internetowy Argish — wszystko dla zdrowia.';
        return driver.get(site)
            .then(_ => driver.findElement(By.className('about-us')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.about-us-info')), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('h1')).getText())
            .then(aboutUsPageTitle => assert.equal(aboutUsPageTitle, expectedAboutUsPageTitle, 'can not see About Us page'))
    };

    this.canVisitContactPageTest = function () {
        let expectedContactPageTitle = 'Kontakt';
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.menu2:nth-child(4)')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.about-us-info')), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('h1')).getText())
            .then(contactPageTitle => assert.equal(contactPageTitle, expectedContactPageTitle, 'can not see Contact page'))
            .then(_ => driver.findElement(By.className('close-popup')).click())
    };
};


module.exports = ButtonTests;