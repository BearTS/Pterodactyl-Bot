
const { MessageEmbed } = require('discord.js')
const sql = require('sqlite')
sql.open('./users.sqlite')

module.exports = client => {

sql.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER, token TEXT)`);

  console.log(`
${client.user.username} is now online!

    Startup Statistics:
Servers:  ||  ${client.guilds.cache.size}
Channels: ||  ${client.channels.cache.size}
Users:    ||  ${client.users.cache.size}
Commands: ||  ${client.commands.size}

<=======BOT LOGS WILL SHOW HERE======>`)



const loggingchannel = client.channels.cache.get('761935856331128837')
if (loggingchannel) loggingchannel.send(
    new MessageEmbed()
    .setColor('GREY')
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(
        'Restarted **'
      + client.user.tag
      + '**. Up and ready to serve on '
      + client.guilds.cache.size + ' servers, '
      + client.channels.cache.size + ' channels, and '
      + client.users.cache.size + ' unique users, with over '
      + client.commands.size + ' commands readily available for use!'
     )
    .setFooter(
        'Boot Time \u200b • \u200b '
      + parseInt(client.readyAt - client.bootTimeStart)
      + ' ms.\u2000\u2000\u2000 | \u2000\u2000\u2000Last Boot '
    ).setTimestamp()
  )
}
