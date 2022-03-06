const chalk = require('chalk');

module.exports = {
    name: 'errorManager',
    customEvent: true,
    run: async() => {
        process.on('unhandledRejection', error => {
            const err = error.stack.split('\n');
            console.log(chalk.bold.red('[Error] ') + chalk.greenBright(err[0].trim()));
            console.log(chalk.bold.red('[Error Location] ') + chalk.greenBright(err[1].trim()));
        });
        process.on('uncaughtException', error => {
            const err = error.stack.split('\n');
            console.log(chalk.bold.red('[Error] ') + chalk.greenBright(err[0].trim()));
            console.log(chalk.bold.red('[Error Location] ') + chalk.greenBright(err[1].trim()));
        });
    }
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
