const Nodeactyl = require('nodeactyl');
const User = require('../../../Model/User');

module.exports = {
    name: 'kill',
    aliases: [],
    description: 'Get all servers',
    ownerOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Nodeactyl',
    usage: '',
    run: async (client, message, [ serverID ], Discord) => {
        try {
            const user = await User.findOne({
                where: {
                    userID: message.author.id
                }
            });
            if (!user) {
                return message.channel.send('You are not registered!');
            }
            const panel = new Nodeactyl.NodeactylClient(process.env.HOST, user.data.clientToken);
            panel.killServer(serverID).then(() => {
                message.channel.send('Server killed!');
            }).catch(err => {
                message.channel.send(`Error: ${err}`);
            }
            );
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