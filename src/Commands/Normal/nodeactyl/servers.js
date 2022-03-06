const Nodeactyl = require('nodeactyl');
const User = require('../../../Model/User');

module.exports = {
    name: 'servers',
    aliases: [],
    description: 'Get all servers',
    ownerOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Client Panel',
    usage: '',
    run: async (client, message, args, Discord) => {
        try {
            const user = await User.findById(message.author.id);
            if (!user) return message.reply(`You are not registered!\nif you want to register, please use \`${process.env.PREFIX}register\` command`);
            const panel = new Nodeactyl.NodeactylClient(process.env.HOST, user.data.clientToken);
            const data = await panel.getAllServers();
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('All servers')
                .setDescription(`Total servers: ${data.meta.pagination.total}`)
                .setFooter({ text: `Made by Bear#3437 | ©️ ${new Date().getFullYear()} Pterodactyl Panel`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
                
            data.data.forEach(servers => {
                const server = servers.attributes;
                embed.addField(`Name: __${server.name}__`,
                    `**Identifier** : ${server.identifier}\n
                    **UUID:** ${server.uuid}\n
                    **Server Owner?** ${server.server_owner}\n
                    **RAM** : ${server.limits.memory} \n
                    **Databases:** ${server.feature_limits.databases}\n
                    **Allocations:** ${server.feature_limits.allocations}`, true);
            });
            return message.channel.send({ embeds: [embed] });
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