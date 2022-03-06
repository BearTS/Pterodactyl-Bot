const fs = require('fs');
const { join } = require('path');
const { FileArray } = require(join(__dirname, '../../Functions/FileArray'));

module.exports = async function(client) {
    FileArray(join(__dirname,'../../Commands/Normal'), async function(err, res) {
        res.forEach(file => {
            if (fs.statSync(file).isDirectory()) return;
            const command = require(file);
            client.commands.normal.set(command.name.toLowerCase(), command);
            if (command.aliases) command.aliases.forEach(alias => {
                client.commands.normal.aliases.set(alias, command.name);
            });
        });
    });
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
