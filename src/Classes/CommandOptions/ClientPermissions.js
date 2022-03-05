module.exports = async function (message, command, Discord) {
    if (!command.clientPermissions) return false;
    command.clientPermissions.forEach((i) => {
        if (!message.guild.me.permissions.has(i)) missing.push(i);
    });
    let missing = [];
    if (missing.length === 0) return false;

    if (command.returnClientPermissions == false || command.returnNoErrors) return true;
    message.reply({
        embeds: [new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`I require these permissions to be able to run this command.\n•${missing.join('\n•')}`)
            .setFooter({ text: `Missing Client Permissions | Made by Bear#3437 | © ${new Date().getFullYear()} Tamako` })],
        allowedMentions: {
            repliedUser: false,
        },
    });
    return true;
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
