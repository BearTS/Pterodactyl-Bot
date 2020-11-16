const settings = require("../../settings.json")
const Discord = require("discord.js")
const nodeactyl = require('nodeactylv1')
const Client = nodeactyl.Client
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports = {
  name: 'start'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Start a server`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['start 01988445']
  , parameters: []
  , run: async ( client, message, args) => {
      sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            Client.login(settings.panelURL, row.token, (logged_in) => {

            });
            Client.startServer(args[0]).then((response) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(response)
                    .setColor(settings.embed.color.default)
                    .setFooter(settings.embed.footer);
                message.channel.send(embed);
            }).catch((error) => {
                message.channel.send(client.embederror(error))
            });
        }

    })

  }
}
