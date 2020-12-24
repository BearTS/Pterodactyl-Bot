const start = Date.now()
console.log('Starting the bot...');
const { Token } = require("./settings.json");
const { readdirSync } = require('fs');
const { join } = require('path');
const settings = require("./settings.json");
const { Intents, MessageEmbed } = require('discord.js');
const Client = require('./struct/Client');
const tamako = new Client({
	clientSettings: {
			disableMentions: 'everyone'
		,	ws: {
				intents: Intents.NON_PRIVILEGED
			}
		,	presence: {
				activity: {
						name: 'Ptero Bot'
					, type:'WATCHING'
					, url: 'Falixnodes.net'
				}
			}
		,	restTimeOffset: 100,
	}
	,	bootTimeStart: start
	,	commandgroups: [
			'bot'
		, 'control'

	]
	,	prefix: 'f!'
	,	uploadchannel: '763019884220383252'
	,	owners: ['397338324328775680']
	,	token: Token,
});
tamako.queue = new Map()
for (const dir of tamako.config.commanddir) {
	for (const file of readdirSync(join(__dirname, 'commands', dir)).filter(f => f.split('.').pop() === 'js'))
		tamako.commands.add(require(`./commands/${dir}/${file}`));
}

tamako.embederror = function (text) {
    const embed = new MessageEmbed()
        .setTitle("Error")
        .setDescription(text)
        .setColor(settings.embed.color.error)
        .setFooter(settings.embed.footer)
        .setTimestamp();
    return embed;
};
tamako.noperm = function (text) {
    const embed = new MessageEmbed()
        .setTitle(`${text} you don't have permission to use this command.`)
        .setColor(settings.embed.color.error)
        .setFooter(settings.embed.footer)
        .setTimestamp();
    return embed;
};

for ( const event of readdirSync(join(__dirname, 'events')).filter( f => f.split('.').pop() === 'js'))
  tamako.on(event.split('.')[0], require(`./events/${event}`).bind(null, tamako));

tamako.connect();
