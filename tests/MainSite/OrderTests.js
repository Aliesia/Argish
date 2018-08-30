const assert = require('assert');
const {By, until} = require('selenium-webdriver');
const OrderObject = require('../../objects/Order');
const displayResult = require('../../objects/Helpers');

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

const OrderTests = function (site, driver, animationTimeTimeout = 5000) {
    let orderObject = new OrderObject(site,driver);

    function enterCart() {
        return orderObject.enterCart();
    }

    function enterAsUnAuth() {
        return orderObject.enterAsUnAuth();
    }

    function enterDefaultPaymentMethod() {
        return orderObject.enterDefaultPaymentMethod();
    }

    function testOrder(cb) {
        return orderObject.testOrder(cb);
    }
    function orderForm(orderData = orderDefaultData) {
        return orderObject.orderForm(orderData);
    }

    this.canRemoveFromCartProductTest = function () {
        let actualProductsQuantity;
        let minimumProductsQuantity = 1;
        return driver
            .then(_ => driver.findElement(By.css('.card-panel .info')).click())
            .then(_ => driver.wait(until.titleIs('Twój koszyk'), animationTimeTimeout))
            .then(_ => driver.findElements(By.css('.dell-row')))
            .then(orderListData => {
                actualProductsQuantity = orderListData.length;
                if (actualProductsQuantity === 0) {
                    assert.fail(actualProductsQuantity, minimumProductsQuantity, 'Not enough products in cart to delete')
                } else if (actualProductsQuantity > 0) {
                    driver.findElement(By.css('.dell-row')).click()
                }
            })
            .then(_ => driver.wait(until.titleIs('Twój koszyk'), animationTimeTimeout))
            .then(_ => driver.findElements(By.css('.dell-row')))
            .then(orderListData => {
                if (actualProductsQuantity - orderListData.length !== 1) {
                    assert.fail(actualProductsQuantity, minimumProductsQuantity, 'Not enough products in cart to delete')
                }
            })
    };

    this.canAddProductToCartTest = function () {
        let actualProductsQuantity;
        let minimumProductsQuantity = 1;
        return driver.get(site)
            .then(_ => driver.findElement(By.css('.nav li a')).click())
            .then(_ => driver.findElement(By.css('figcaption a')).click())
            .then(_ => driver.findElement(By.css('.add-cart .green')).click())
            .catch(_ => assert.fail('not green','green','Product can not be added, because there are no products in stock'))
            .then(_ => driver.wait(until.titleIs('Twój koszyk'), animationTimeTimeout))
            .then(_ => driver.findElements(By.css('.cart-tr')))
            .then(orderListData => {
                actualProductsQuantity = orderListData.length;
                displayResult(actualProductsQuantity);
                if (actualProductsQuantity === 0) {
                    assert.fail(actualProductsQuantity, minimumProductsQuantity, 'Not enough products in cart')
                }
            })
    };



    this.canOrderProductAsGuestTest = function () {
        let guestMail = 'fake'+ Math.random().toString(36).substring(6)+'@test.com';
        return enterCart()
            .then(_ => enterAsUnAuth())
            .then(_ => orderForm())
            .then(_ => enterDefaultPaymentMethod())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('button')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.ico-result-ok')), animationTimeTimeout))
    };

    this.canChangeOrderAddressTest = function () {
        let guestMail = 'fake'+ Math.random().toString(36).substring(6)+'@test.com';
        return enterCart()
            .then(_ => enterAsUnAuth())
            .then(_ => orderForm())
            .then(_ => enterDefaultPaymentMethod())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.holder-left .at-text-box:nth-child(1) a')).click())
            .then(_ => driver.findElement(By.name('post_address')).clear())
            .then(_ => driver.findElement(By.name('post_address')).sendKeys('Fkea St.191'))
            .then(_ => driver.findElement(By.name('post_flat')).clear())
            .then(_ => driver.findElement(By.name('post_flat')).sendKeys('34'))
            .then(_ => driver.findElement(By.name('post_index')).clear())
            .then(_ => driver.findElement(By.name('post_index')).sendKeys('34019'))
            .then(_ => driver.findElement(By.name('post_city')).clear())
            .then(_ => driver.findElement(By.name('post_city')).sendKeys('Wroclaw'))
            .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.ico-result-ok')), animationTimeTimeout))
    };

    this.canChangeDeliveryMethodTest = function () {
        let newDeliveryMethod;
        return testOrder((_ => {
                driver.findElement(By.css('.holder-left .at-text-box:nth-child(2) a')).click()
                    .then(_ => driver.findElement(By.css('.holder-right .radio-list li:nth-child(2)')).getText())
                    .then(tempDeliveryMethod => newDeliveryMethod = tempDeliveryMethod)
                    .then(_ => driver.findElement(By.css('.holder-right .radio-list li:nth-child(2)')).click())
                    .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
                    .then(_ => driver.findElement(By.css('.holder-left .at-text-box:nth-child(2) p')).getText())
                    .then(tempDeliveryMethod => assert.equal(tempDeliveryMethod, newDeliveryMethod, 'delivery method is  not changed on step 3'))
            })
        )
    };

    this.canChangeMyCommentInOrderTest = function () {
        let newComment = 'I changed my comment';
        return testOrder((_ => {
                driver.findElement(By.css('.holder-left .at-text-box:nth-child(3) a')).click()
                    .then(_ => driver.findElement(By.name('comment')).clear())
                    .then(_ => driver.findElement(By.name('comment')).sendKeys(newComment))
                    .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
                    .then(_ => driver.findElement(By.css('.holder-left .at-text-box:nth-child(3) p')).getText())
                    .then(tempComment => assert.equal(tempComment, newComment, 'comment is  not changed on step 3'))
            })
        )
    };

    this.canChangePaymentMethodTest = function () {
        let paymentMethod ;
        return testOrder((_ => {
                driver.findElement(By.css('.holder-right .at-text-box:nth-child(1) a')).click()
                    .then(_ => driver.findElement(By.css('.radio-list li:nth-child(1) div')).getText())
                    .then(tempPaymentMethod => paymentMethod = tempPaymentMethod)
                    .then(_ => driver.findElement(By.css('.radio-list li:nth-child(1) div')).click())
                    .then(_ => driver.findElement(By.css('.payment-btn .button')).click())
                    .then(_ => driver.findElement(By.css('.holder-left .at-text-box:nth-child(1) li')).getText())
                    .then(tempPaymentMethod => assert.equal(tempPaymentMethod, paymentMethod, 'payment method is  not changed on step 3'))
            })
        )
    };

    this.canDoBillTest = function () {
        let guestMail = 'fake'+ Math.random().toString(36).substring(6)+'@test.com';
        let orderData = orderDefaultData;
        orderData.guestCommentToOrder = 'I can write e-mail for a bill!';

        return enterCart()
            .then(_ => enterAsUnAuth())
            .then(_ => orderForm(orderData))
            .then(_ => enterDefaultPaymentMethod())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.ico-result-ok')), animationTimeTimeout))
    };

    this.canSingForNewsletterTest = function () {
        let guestMail = 'fake'+ Math.random().toString(36).substring(6)+'@test.com';
        let orderData = orderDefaultData;
        orderData.guestCommentToOrder = 'I can sign up for newsletter!';
        return enterCart()
            .then(_ => enterAsUnAuth())
            .then(_ => orderForm(orderData))
            .then(_ => enterDefaultPaymentMethod())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.id('myCheckbox0')).click())
            .then(_ => driver.wait(until.elementLocated(By.className('checkboxAreaChecked')), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.ico-result-ok')), animationTimeTimeout))
    };

    this.canRegisterHimInOrderTest = function () {
        let guestMail = 'fake'+ Math.random().toString(36).substring(6)+'@test.com';
        let orderData = orderDefaultData;
        orderData.guestCommentToOrder = 'I can register myself on final stage of order!';
        return enterCart()
            .then(_ => enterAsUnAuth())
            .then(_ => orderForm(orderData))
            .then(_ => enterDefaultPaymentMethod())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.name('email')).sendKeys(guestMail))
            .then(_ => driver.findElement(By.id('myCheckbox1')).click())
            .then(_ => driver.findElement(By.css('.total-btns')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.ico-result-ok')), animationTimeTimeout))
    };

    this.canOrderProductAsUserTest = function () {
        return enterCart()
            .then(_ => driver.wait(until.titleIs('Dostawa'), animationTimeTimeout))
            .then(_ => orderForm())
            .then(_ => enterDefaultPaymentMethod())
            .then(_ => driver.wait(until.titleIs('Potwierdzenie'), animationTimeTimeout))
            .then(_ => driver.findElement(By.css('.total-btns')).click())
            .then(_ => driver.wait(until.elementLocated(By.css('.ico-result-ok')), animationTimeTimeout))
    };
};


module.exports = OrderTests;