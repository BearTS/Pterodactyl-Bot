const chalk = require('chalk');

module.exports = {
    name: 'ready',
    run: async(client) => {
        client.user.setActivity('Discord', {
            type: 'WATCHING',
        });
        console.log(chalk.bold.yellowBright('[Bot] ') + chalk.bold.blueBright(`Connected to ${client.user.tag}`));
        if (client.commands.normal.size > 0) console.log(chalk.bold.redBright('[Handler]') + chalk.bold.greenBright(` Loaded ${client.commands.normal.size} commands.`));
        if (client.commands.normal.aliases.size > 0) console.log(chalk.bold.whiteBright('[Handler]') + chalk.bold.magentaBright(` Loaded ${client.commands.normal.aliases.size} aliases.`));
        if (client.events.size > 0) console.log(chalk.bold.greenBright('[Handler]') + chalk.bold.cyanBright(` Loaded ${client.events.size} events.`));
    }
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
