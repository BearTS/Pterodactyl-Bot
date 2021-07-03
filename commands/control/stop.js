const settings = require("../../settings.json")
const Discord = require("discord.js")
const nodeactyl = require('nodeactyl')
const Client = nodeactyl.Client
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports = {
  name: 'stop'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Stop a server`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['stop 01988445']
  , parameters: []
  , run: async ( client, message, args) => {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            Client.login(settings.panelURL, row.token, (logged_in) => {

            });
            Client.stopServer(args[0]).then((response) => {
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
