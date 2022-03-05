module.exports = async function (client, message, command, Discord) {
    if (!command.onlyUsers) return false;
    if (command.onlyUsers.some(i => i == message.member.user.id)) return false;
    else {
        let onlyUsers = [];
        command.onlyUsers.forEach(id => {
            onlyUsers.push(`<@${id}>`);
        });
        if (command.returnOnlyUsers == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`This command can only be ran by these people.\n• ${onlyUsers.join('\n• ')}`)
                .setFooter({ text: `Command is only available to certain users | Made by Bear#3437 | © ${new Date().getFullYear()} Tamako` })],
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
