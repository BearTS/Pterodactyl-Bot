const Nodeactyl = require('nodeactyl');
const User = require('../../../Model/User');

module.exports = {
    name: 'serverinfo',
    aliases: [],
    description: 'Get a serverinfo by ID',
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
            panel.getServerDetails(serverID).then(server => {
                panel.getServerUsages(serverID).then(usage => {
                    let ips = [];
                    server.relationships.allocations.data.forEach(element => {
                        const ip = element.attributes.ip + ':' + element.attributes.port;
                        ips.push(ip);
                    });
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(server.name) 
                        .setDescription(`\`${server.name}\` is running on \`${ips.join('` | `')}\``)
                        .addFields(
                            { name: 'ID', value: `${server.identifier}`, inline: true },
                            { name: 'Status', value: `${usage.current_state}`, inline: true },
                            { name: 'Owner?', value: `${server.server_owner}`, inline: true },
                            { name: 'Database', value: `${server.feature_limits.databases}`, inline: true },
                            { name: 'Allocations', value: `${server.feature_limits.allocations}`, inline: true },
                            { name: 'RAM', value: `${(usage.resources.memory_bytes / 1024 / 1024).toFixed(2)} / ${server.limits.memory} MB`, inline: true },
                            { name: 'Disk Usage', value: `${(usage.resources.disk_bytes / 1024 / 1024).toFixed(2)} / ${server.limits.disk} MB`, inline: true }
                        )
                        .setFooter({ text: `Made by Bear#3437 | ©️ ${new Date().getFullYear()} Tamako`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

                    return message.channel.send({ embeds: [embed] });    
                }).catch(err => {
                    if (err === 404) return message.channel.send('Server not found!');
                    return message.channel.send(`Error: ${err}`);
                });
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