const Config = require('../objects/Config');

const ConfigService = function (site, driver, animationTimeTimeout = 2000) {
    const config = new Config(site, driver);

    this.disableDebugbar = function () {
        config.disableDebugbar();
    };

};

module.exports = ConfigService;