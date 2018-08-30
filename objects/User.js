const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const displayResult = require('./Helpers');

const User = function (site, driver, animationTimeTimeout = 5000) {

    function logIn(email, password) {
        return driver.get(site)
            .then(_ => driver.findElement(By.className('logout-ico')).click())
            .catch(_ => {})
            .then(_ => driver.findElement(By.css('[onclick="auth()"]')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('sideform')), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(email))
            .then(_ => driver.findElement(By.name('password')).sendKeys(password))
            .then(_ => driver.findElement(By.id('sbtnG')).click())

    }

    this.asAdmin = function (adminEmail = 'Adm@test.com', adminPassword = 'ffffff') {
        return logIn(adminEmail, adminPassword);
    };

    this.asUser = function (userEmail = 'guest@fake.com', userPassword = '123456789') {
        return logIn(userEmail, userPassword);
    };

    this.asGuest = function () {
        return driver.get(site)
            .then(_ => driver.findElement(By.className('logout-ico')).click())
            .catch(_ => true);
    };
};

module.exports = User;