const { join } = require('path');
const config = require(join(__dirname, '../config.js'));

module.exports = {
    name: 'messageCreate',
    run: async(message, client) => {
        config.prefix.forEach(prefix => {
            if (!message.content.toLowerCase().startsWith(prefix)) return;
            const cmdName = message.content.toString().toLowerCase().slice(prefix.length).trim().split(' ')[0];
            const command = client.commands.normal.get(cmdName) ?? client.commands.normal.get(client.commands.normal.aliases.get(cmdName));
            if (!command) return;
            const loadCommandOptions = require(join(__dirname, '../Classes/CommandOptions/loadCommandOptions'));
            if (command.allowBots) loadCommandOptions(client, message, command, false);
            else if (message.author.bot) return;
            else if (command.guildOnly == false) loadCommandOptions(client, message, command, false);
            else if (!message.guild) return;
            else loadCommandOptions(client, message, command, false);
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
