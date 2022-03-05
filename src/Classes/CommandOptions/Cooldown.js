const db = require('quick.db');

module.exports = async function (client, message, command, Discord) {
    if (!command.cooldown) return false;
    const currentTime = Date.now();
    const { cooldown } = command;
    const oldTime = await db.get(`CooldownSystem.${message.guild.id}.${command.name}.'Normal'.${message.member.id}`) ?? 0;
    if (Math.floor(currentTime - oldTime) >= cooldown || oldTime == 0) {
        await db.set(`CooldownSystem.${message.guild.id}.${command.name}.Normal}.${message.member.id}`, currentTime);
        return false;
    }
    if (command.returnCooldown == false || command.returnNoErrors) return true;

    message.reply({
        embeds: [new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`You are currently at cooldown until <t:${Math.floor(Math.floor(oldTime + cooldown) / 1000)}>`)
            .setFooter({ text: `Cooldown | Made by Bear#3437 | © ${new Date().getFullYear()} Tamako` })],
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
