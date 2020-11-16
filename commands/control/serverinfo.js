const Discord = require("discord.js")
const settings = require("../../settings.json")
const nodeactyl = require('nodeactylv1')
const Client = nodeactyl.Client
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports = {
  name: 'serverinfo'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Get serverinfo on a particular server`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['serverinfo 01988445']
  , parameters: []
  , run: async ( client, message, args) => {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            message.channel.send(client.embederror(`You are not registered within the bot so you do not have access to this command.`))
        } else {
            Client.login(settings.panelURL, row.token, (logged_in, msg) => {
                if(logged_in === false){
                    return message.channel.send(client.embederror(`You don't have a valid token or a account on the panel.`))
                }
            })
            Client.getServerInfo(args[0]).then(responsed => {
                Client.getRAMUsage(args[0]).then(ram => {
                    Client.getDiskUsage(args[0]).then(disk => {
                        const response = responsed.attributes
                        const embed = new Discord.MessageEmbed()
                            .setTitle(response.name)
                            .setColor(settings.embed.color.default)
                            .setFooter(settings.embed.footer)
                            .addField('ID:', response.identifier, true)
                            .addField(`Server Owner?`, response.server_owner, true)
                            .addField(`Databases:`, response.feature_limits.databases, true)
                            .addField(`Allocations:`, response.feature_limits.allocations, true)
                            .addField('Ram Usage:', `${ram.current}/${ram.limit}`, true)
                            .addField(`Disk Usage:`, `${disk.current}/${disk.limit}`, true);

                        if (response.description.length > 0) {
                            embed.setDescription(response.description)
                        }
                        message.channel.send(embed)
                    }).catch((error) => {
                        message.channel.send(client.embederror(error))
                    });
                });
            }).catch((error) => {
                message.channel.send(client.embederror(error))
            });


        }
    })

  }
}
