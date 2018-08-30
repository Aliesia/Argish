const assert = require('assert');
const {By, until} = require('selenium-webdriver');

let orderDefaultData = {
    guestName:'GuestNameFake',
    guestLastName: 'GuestLastNameFake',
    guestAddress: 'Fake St.19',
    guestFlatAddress: '43',
    guestPost: '43019',
    guestCity: 'Breslau',
    guestPhone: '789012345',
    guestCommentToOrder: 'Hello!'
};

const Order = function (site, driver, animationTimeTimeout = 5000) {
    function enterCart() {
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.add-cart .green')).click())
            .catch(_ => assert.fail('not green','green','Product can not be added, because there are no products in stock'))
            .then(_ => driver.wait(until.titleIs('Twój koszyk'), animationTimeTimeout))
            .then(_ => driver.findElement(By.id('sbtn')).click());

    }
    function enterAsUnAuth() {
        return driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout)
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click());
    }
    function enterDefaultPaymentMethod() {
        return driver.findElement(By.css('.payment-btn .button')).click()
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.sleep(1000))
            .then(_ => driver.findElement(By.css('.payment-btn button')).click());
    }
    function testOrder(cb) {
        let guestMail = 'fake'+ Math.random().toString(36).substring(6)+'@test.com';

        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.add-cart .green')).click())
            .catch(_ => assert.fail('not green','green','Product can not be added, because there are no products in stock'))
            .then(_ => driver.wait(until.titleIs('Twój koszyk'), animationTimeTimeout))
            .then(_ => driver.findElement(By.id('sbtn')).click())
            .then(_ => driver.wait(until.titleIs('Autoryzacja'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.without-reg-block a')).click())
            .then(_ => orderForm())
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.findElement(By.css('.box-input li:nth-child(2)')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('button .green')),animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.payment-btn button')).click())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => cb())
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.ico-result-ok')), animationTimeTimeout))
    }
    function orderForm(orderData = orderDefaultData) {
        driver
            .then(_ => driver.findElement(By.name('post_name')).clear())
            .then(_ => driver.findElement(By.name('post_name')).sendKeys(orderData.guestName))
            .then(_ => driver.findElement(By.name('post_last_name')).clear())
            .then(_ => driver.findElement(By.name('post_last_name')).sendKeys(orderData.guestLastName))
            .then(_ => driver.findElement(By.name('post_address')).clear())
            .then(_ => driver.findElement(By.name('post_address')).sendKeys(orderData.guestAddress))
            .then(_ => driver.findElement(By.name('post_flat')).clear())
            .then(_ => driver.findElement(By.name('post_flat')).sendKeys(orderData.guestFlatAddress))
            .then(_ => driver.findElement(By.name('post_index')).clear())
            .then(_ => driver.findElement(By.name('post_index')).sendKeys(orderData.guestPost))
            .then(_ => driver.findElement(By.name('post_city')).clear())
            .then(_ => driver.findElement(By.name('post_city')).sendKeys(orderData.guestCity))
            .then(_ => driver.findElement(By.name('post_phone')).clear())
            .then(_ => driver.findElement(By.name('post_phone')).sendKeys(orderData.guestPhone))
            .then(_ => driver.findElement(By.name('comment')).clear())
            .then(_ => driver.findElement(By.name('comment')).sendKeys(orderData.guestCommentToOrder))
    }

    this.enterCart = function () {
        return enterCart();
    };
    this.enterAsUnAuth = function () {
        return enterAsUnAuth();
    };
    this.enterDefaultPaymentMethod = function () {
        return enterDefaultPaymentMethod();
    };
    this.testOrder = function (cb) {
        return testOrder(cb);
    };
    this.orderForm = function (orderData) {
        return orderForm(orderData);
    };
};

module.exports = Order;