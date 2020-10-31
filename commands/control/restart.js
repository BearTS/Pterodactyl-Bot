const Discord = require("discord.js")
const settings = require("../../settings.json")
const nodeactyl = require('nodeactyl-v1-support')
const Client = nodeactyl.Client
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports = {
  name: 'restart'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Restart a particular server`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['restart 1984106']
  , parameters: []
  , run: async ( client, message, args) => {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if(!row){
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            Client.login(settings.panelURL, row.token, (logged_in) => {
                if(logged_in === false){
                    return message.channel.send(client.embederror(`You don't have a valid token or a account on the panel.`))
                }
            });
            Client.restartServer(args[0]).then((response) => {
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
