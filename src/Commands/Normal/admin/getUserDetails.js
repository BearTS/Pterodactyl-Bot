const Nodeactyl = require('nodeactyl');
const User = require('../../../Model/User');

module.exports = {
    name: 'getuserdetails',
    aliases: [],
    description: 'Get info about a users',
    ownerOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Admin Panel',
    usage: '[userID]',
    run: async (client, message, [id], Discord) => {
        try {
            const user = await User.findById(message.author.id);
            if (!user.isAdmin) return message.reply('You are not registered as an admin!');
            const panel = new Nodeactyl.NodeactylApplication(process.env.HOST, user.data.ApplicationToken);
            panel.getUserDetails(id).then(async (data) => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('User Details');
                const user = data.attributes;
                embed.addField(`Name: __${user.username}__`,
                    `**Identifier** : ${user.id}
                    **UUID:** ${user.uuid}
                    **Email:** ${user.email}
                    **Name:** ${user.first_name + ' ' + user.last_name}
                    **Username:** ${user.username}
                    **isAdmin?** ${user.root_admin}
                    **Created At:** ${user.created_at}\n`, true);
                return message.channel.send({ embeds: [embed] });
            }).catch(err => {
                if (err === 403) return message.reply('Invalid API Token!');
                return message.reply(err);
            });
        } catch (err) {
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