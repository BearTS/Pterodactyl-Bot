const User = require('../../../Model/User');

module.exports = {
    name: 'unregister',
    aliases: [],
    description: 'Delete ClientAPI Token',
    ownerOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Nodeactyl',
    usage: '',
    run: async (client, message, args, Discord) => {
        try {
            User.findById(message.author.id, (err, doc) => {
                if (err) return console.log(err);
                if (!doc) {
                    return message.reply(`You are not registered!\nif you want to register, please use \`${process.env.PREFIX}register\` command`);
                }
                if (doc) {
                    User.findByIdAndDelete(message.author.id, (err, doc) => {
                        if (err) return console.log(err);
                        if (doc) {
                            return message.reply('Successfully Unregistered!');
                        }
                    });
                }
            });
        } catch (err) {
            return message.reply({ content: `Let my developer know in the support server https://discord.gg/dDnmY56 or using \`${process.env.PREFIX}feedback\` command`, embeds: [ 
                new Discord.MessageEmbed()
            ] });
        }
    }};