const glob = require('glob');

module.exports = {
    FileArray(src, callback) {
        glob(src + '/**/*', callback);
    }
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
