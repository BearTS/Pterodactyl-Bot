const User = require('../../../Model/User');

module.exports = {
    name: 'reregister',
    aliases: [],
    description: 'Reregister Client Token',
    ownerOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Client Panel',
    usage: '',
    run: async (client, message, args, Discord) => {
        try {
            User.findById(message.author.id, (err, doc) => {
                if (err) { 
                    console.log(err);
                    return message.channel.send('An error occured.');
                }
                if (!doc) {
                    return message.reply(`You are not registered!\nif you want to register, please use \`${process.env.PREFIX}register\` command`);
                }
                if (doc) {
                    message.reply('Check your dm\'s to reregister with the panel!');
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Please enter your token below. You can get one at ${process.env.HOST}/account/api. You have 60 seconds!`)
                        .setColor('Blue')
                        .setFooter({ text: `Made by Bear#3437 | ©️ ${new Date().getFullYear()} Tamako`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
                   
                    message.author.send({ embeds: [embed] }).then(async (msg) => {
                        const filter = m => m.author.id === message.author.id;
                        const collector = msg.channel.createMessageCollector({ filter, time: 60000 });
                        
                        collector.on('collect', async (m) => {
                            if (m.content.toLowerCase() === 'cancel') {
                                collector.stop();
                                return msg.channel.send('Cancelled!');
                            }
                            if (m.content) {
                                // update the database
                                await User.findByIdAndUpdate(message.author.id, {
                                    $set: {
                                        'data.clientToken': m.content
                                    }
                                }, { new: true }, (err, doc) => {
                                    if (err) { 
                                        console.log(err);
                                        collector.stop();
                                        return message.reply('Something went wrong!');
                                    
                                    }
                                    if (doc) {
                                        collector.stop();
                                        return msg.channel.send('Successfully Re-Registered!');
                                    }
                                });
                            }
                        });
                        
                        collector.on('end', async (collected, reason) => {
                            console.log(`Collected ${collected.size} items.`);
                            if (reason === 'time') {
                                return msg.channel.send('Timed out!');
                            }
   
                        });
                    });
                }
            });
        } catch (err) {
            return message.reply({ content: `Let my developer know in the support server https://discord.gg/dDnmY56 or using \`${process.env.PREFIX}feedback\` command`, embeds: [ 
                new Discord.MessageEmbed()
            ] });
        }
    }};