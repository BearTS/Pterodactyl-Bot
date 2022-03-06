module.exports = async function (message, command, Discord) {
    if (!command.userPermissions) return false;
    let missing = [];
    command.userPermissions.forEach(i => {
        if (!message.member.permissions.has(i)) missing.push(i);
    });
    if (missing.length == 0) return false;
    else {
        if (command.returnUserPermissions == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
                .setDescription({ text: `You are required to have these permissions to be able to run this command.\n•${missing.join('\n•')}` })
                .setFooter({ text: `Missing Client Permissions | Made by Bear#3437 | © ${new Date().getFullYear()} Tamako` })],
            allowedMentions: {
                repliedUser: false
            }
        });
        return true;
    }
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
