const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const displayResult = require('../objects/Helpers');

const User = function (site, driver, animationTimeTimeout = 2000) {

    this.asAdmin = function (adminEmail = 'test@admin1test.com', adminPassword = 'adminPassword') {
        return driver.get(site)
            .then(_ => driver.findElement(By.className('logout-ico')).click())
            .catch(_ => displayResult('was authorized logging out'))
            .then(_ => driver.findElement(By.css('[onclick="auth()"]')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('sideform')), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(adminEmail))
            .then(_ => driver.findElement(By.name('password')).sendKeys(adminPassword))
            .then(_ => driver.findElement(By.id('sbtnG')).click())
    };

    this.asUser = function (userEmail = 'guest@fake.com', userPassword = '123456789') {
        return driver.get(site)
            .then(_ => driver.findElement(By.className('logout-ico')).click())
            .catch(_ => displayResult('was authorized logging out'))
            .then(_ => driver.findElement(By.css('.avt a')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('sideform')), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(userEmail))
            .then(_ => driver.findElement(By.name('password')).sendKeys(userPassword))
            .then(_ => driver.findElement(By.id('sbtnG')).click())
    };

    this.asGuest = function () {
        return driver.get(site)
            .then(_ => driver.findElement(By.className('logout-ico')).click())
            .catch(_ => displayResult('was authorized logging out'))
    };
};

module.exports = User;