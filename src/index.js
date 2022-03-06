const { join } = require('path');
const config = require(join(__dirname, 'config.js'));
const Discord = require('discord.js');
const mongoose = require('mongoose');

(async () => {
    const client = new Discord.Client({
        intents: [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_PRESENCES,
            Discord.Intents.FLAGS.DIRECT_MESSAGES,
            Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Discord.Intents.FLAGS.GUILD_MEMBERS,
            Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Discord.Intents.FLAGS.GUILD_WEBHOOKS,
            Discord.Intents.FLAGS.GUILD_VOICE_STATES,
            Discord.Intents.FLAGS.GUILD_INVITES,
            Discord.Intents.FLAGS.GUILD_BANS,
        ],
        partials: ['CHANNEL']
    });
    
    exports.client = client;
    client.commands = new Discord.Collection();
    client.commands.normal = new Discord.Collection();
    client.events = new Discord.Collection();
    client.commands.normal.aliases = new Discord.Collection();

    const Handler = require(join(__dirname, 'Classes/Handlers/Handler'));
    await mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB Connection Successfull!')).catch((err) => {console.log(err); });
    await Handler.loadCommands(client);
    await Handler.loadEvents(client);
    await client.login(config.token);
})();

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
