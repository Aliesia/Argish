const {By, until} = require('selenium-webdriver');
const displayResult = require('../objects/Helpers');

const Config = function (site, driver) {
    this.disableDebugbar = function () {
        const DEBUGBAR_DISABLED = 'debugBar is off';

        return driver.get(site)
            .then(_ => driver.findElement(By.className('phpdebugbar-close-btn')).click())
            .catch(_ => displayResult(DEBUGBAR_DISABLED))
    };
};

module.exports = Config;