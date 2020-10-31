const settings = require("../../settings.json")
const Discord = require("discord.js")
const nodeactyl = require('nodeactyl-v1-support')
const Client = nodeactyl.Client
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports = {
  name: 'send'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Send a command to a server`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['send 01988445 command']
  , parameters: []
  , run: async ( client, message, args) => {
          sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            Client.login(settings.panelURL, row.token, (logged_in) => {

            });
            Client.sendCommand(args[0], args[1]).then((response) => {
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
