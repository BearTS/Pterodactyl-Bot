const Discord = require("discord.js")
const settings = require("../../settings.json")
const sql = require("sqlite");
sql.open("./users.sqlite")
module.exports = {
  name: 'reset'
  , aliases: []
  , guildOnly: true
  , group: 'control'
  , description: `Reset the API TOKEN`
  , clientPermissions: [
    'EMBED_LINKS'
  ]
  , examples: ['reset']
  , parameters: []
  , run: async ( client, message, args) => {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            message.reply(`Check your dm's to reregister with the panel!`)
            const embed1 = new Discord.MessageEmbed()
                .setTitle(`Please enter your token below. You can get one at ${settings.panelURL}/account/api. You have 60 seconds!`)
                .setColor(settings.embed.color.default)
                .setFooter(settings.embed.footer);
            message.author.send(embed1).then(async (d) => {
                const filter = m => m.author.id === message.author.id;
                d.channel.awaitMessages(filter, { max: 1, time: 60000 })
                    .then(collected => {
                        sql.run(`UPDATE users SET token = "${collected.first().content}" WHERE id = "${message.author.id}"`).catch(error => {
                            return message.channel.send(client.embederror(error))
                        });
                        const embed2 = new Discord.MessageEmbed(embed1)
                            .setTitle(`You have been reregistered into the database!`);
                        d.edit(embed2)
                    })
                    .catch(collected => {
                        if (collected.size === 0) {
                            return d.edit(client.embederror(`You did not provide a token within the given amount of time.`))
                        }
                    }).catch(err => {
                        message.channel.send(client.embederror(err))
                    })
            }).catch(err => {
                message.channel.send(client.embederror(err))
            })
        }
    })
  }
}
