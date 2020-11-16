const Discord = require("discord.js")
const settings = require("../../settings.json")
const nodeactyl = require('nodeactylv1')
const Client = nodeactyl.Client
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports = {
  name: 'servers'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Get a full list of servers in your pterodactyl panel`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['servers']
  , parameters: []
  , run: async ( client, message, args) => {
    let user = message.mentions.users.first();
    if (args.length > 0) {
        sql.get(`SELECT * FROM users WHERE id = "${user.id}"`).then(row => {
            if (!row) {
                const nobien = `The user whose servers you requested is not registered.`
                message.channel.send(client.embederror(nobien))
            } else {
                Client.login(settings.panelURL, row.token, (logged_in, msg) => {
                    if (logged_in === false) {
                        return message.channel.send(client.embederror(`You don't have a valid token or a account on the panel.`))
                    }
                    if (msg) {
                        return message.channel.send(client.embederror(`You don't have a valid token or a account on the panel.`))
                    }
                })

                const servers = new Discord.MessageEmbed()
                    .setColor(settings.embed.color.default)
                    .setTitle(`${user.username}'s Servers`)
                    .setTimestamp()
                    .setFooter(settings.embed.footer);

                Client.getAllServers().then(response => {

                    response.forEach(function (element) {

                        servers.addField(
                            `__${element.attributes.name}__`,
                            `**Identifier** : ${element.attributes.identifier}\n**UUID:** ${element.attributes.uuid}\n**Server Owner?** ${element.attributes.server_owner}\n**RAM** : ${element.attributes.limits.memory}\n**Databases:** ${element.attributes.feature_limits.databases}\n**Allocations:** ${element.attributes.feature_limits.allocations}`, true)


                    });
                    message.channel.send(servers);
                }).catch(err => {
                    console.log(err)
                })

            }
        })
    } else {
        sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
            if (!row) {
                const nobien = `You are not registered.`
                message.channel.send(client.embederror(nobien))
            } else {
                Client.login(settings.panelURL, row.token, (logged_in, msg) => {
                    if (logged_in === false) {
                        return message.channel.send(client.embederror(`You don't have a valid token or a account on the panel.`))
                    }
                    if (msg) {
                        return message.channel.send(client.embederror(`You don't have a valid token or a account on the panel.`))
                    }
                })

                const servers = new Discord.MessageEmbed()
                    .setColor(settings.embed.color.default)
                    .setTitle(`${message.author.username}'s Servers`)
                    .setTimestamp()
                    .setFooter(settings.embed.footer);

                Client.getAllServers().then(response => {

                    response.forEach(function (element) {

                        servers.addField(
                            `__${element.attributes.name}__`,
                            `**Identifier** : ${element.attributes.identifier}\n**UUID:** ${element.attributes.uuid}\n**Server Owner?** ${element.attributes.server_owner}\n**RAM** : ${element.attributes.limits.memory}\n**Databases:** ${element.attributes.feature_limits.databases}\n**Allocations:** ${element.attributes.feature_limits.allocations}`, true)


                    });
                    message.channel.send(servers);
                }).catch(err => {
                    console.log(err)
                })

            }
        })
    }

  }
}
