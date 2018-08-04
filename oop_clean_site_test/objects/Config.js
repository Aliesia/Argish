const {By, until} = require('selenium-webdriver');
const displayResult = require('../objects/Helpers');

const Config = function (site, driver) {
    this.disableDebugbar = function () {
        const DEBUGBAR_DISABLED = 'debugBar is off';

        return driver.get(site)
            .then(_ => driver.findElement(By.className('phpdebugbar-close-btn')).click())
            .catch(_ => displayResult(DEBUGBAR_DISABLED))
    };
    
    this.disableCookies = function () {
    	const COOKIES_DISABLED = 'cookiesBar is off';

    	return driver.get(site)
    	.then(_=> driver.wait(until.elementLocated(By.css('#cookies a')), 2000))
    	.then(_=> driver.findElement(By.css('#cookies a')).click())
    	.catch(_ => displayResult(COOKIES_DISABLED))
    };
};

module.exports = Config;