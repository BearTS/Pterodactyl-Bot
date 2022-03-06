const Nodeactyl = require('nodeactyl');
const User = require('../../../Model/User');

module.exports = {
    name: 'stop',
    aliases: [],
    description: 'Stop a single server',
    ownerOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Client Panel',
    usage: '[server id]',
    run: async (client, message, [ serverID ], Discord) => {
        try {
            const user = await User.findById(message.author.id);
            if (!user) return message.reply(`You are not registered!\nif you want to register, please use \`${process.env.PREFIX}register\` command`);
            const panel = new Nodeactyl.NodeactylClient(process.env.HOST, user.data.clientToken);
            panel.stopServer(serverID).then(() => {
                return message.channel.send('Server Stopped!');
            }).catch(err => {
                if (err === 404) return message.channel.send('Server not found!');
                return message.channel.send(`Error: ${err}`);
            });
        } catch (err) {
            if (err === 403) return message.reply('Invalid API Token!');
            return message.reply({ content: `Let my developer know in the support server https://discord.gg/dDnmY56 or using \`${process.env.PREFIX}feedback\` command`, embeds: [ 
                new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Error')
                    .setDescription(`\`${err}\``)
                    .setFooter({ text: `Error Occured | Made by Bear#3437 | ©️ ${new Date().getFullYear()} Tamako`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })]
            });
        }
    }
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */