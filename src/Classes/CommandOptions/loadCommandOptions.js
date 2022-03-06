const Discord = require('discord.js');
const { join } = require('path');
const config = require(join(__dirname,  '../../config.js'));

module.exports = async function (client, message, command, isInteraction) {
    if (!command) return;
    if (await require(join(__dirname, 'Cooldown'))(client, message, command, Discord)) return;
    else if (await require(join(__dirname, 'OwnerOnly'))(message, command, Discord)) return;
    else if (await require(join(__dirname, 'UserPermissions'))(message, command, Discord)) return;
    else if (await require(join(__dirname, 'ClientPermissions'))(message, command, Discord)) return;
    else if (await require(join(__dirname, 'OnlyChannels'))(message, command, Discord)) return;
    else if (await require(join(__dirname, 'OnlyUsers'))(client, message, command, Discord)) return;
    if (isInteraction) command.run(client, message, Discord);
    else {
        config.prefix.forEach(prefix => {
            if (!message.content.toLowerCase().startsWith(prefix)) return;
            const cmdName = message.content.toString().toLowerCase().slice(prefix.length).trim().split(' ')[0];
            const command = client.commands.normal.get(cmdName) ?? client.commands.normal.get(client.commands.normal.aliases.get(cmdName));
            if (!command) return;
            let args = message.content.slice(prefix.length).trim();
            if (args.toLowerCase().startsWith(cmdName)) args = args.slice(cmdName.length).trim().split(' ');
            command.run(client, message, args, Discord);
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
