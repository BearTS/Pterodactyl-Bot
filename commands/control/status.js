const nodeactyl = require('nodeactyl')
const Client = nodeactyl.Client
const Discord = require("discord.js")
const settings = require("../../settings.json")
const sql = require("sqlite");
sql.open("./users.sqlite")
module.exports = {
  name: 'status'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Get Status of a particular server`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['status 01988445']
  , parameters: []
  , run: async ( client, message, args) => {
    if (!args) {
        const nosyntax = 'You must provide a server identifier to check the status of.'
        return message.channel.send(client.embederror(nosyntax))
    }
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            Client.login(settings.panelURL, row.token, (logged_in) => { });
            Client.getServerStatus(args[0]).then((status) => {
                message.reply(status)
            }).catch((error) => {
                message.channel.send(client.embederror(error))
            });
        }
    })

  }
}
