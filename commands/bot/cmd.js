
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "cmd"
  , aliases: [
    'command'
    , 'commands'
  ]
  , group: "bot"
  , description: "Sends a list of all commands from a specific command group"
  , clientPermissions: [
    'EMBED_LINKS'
    , 'ADD_REACTIONS'
  ]
  , examples: [
    'cmd anime'
    , 'commands'
  ]
  , parameters: [
    'command group'
  ]
  , run: (client, message, [ query ]) => {

    const fields = []

    for (const group of client.config.commanddir){
      fields.push({
        name: `${group[0].toUpperCase() + group.slice(1).toLowerCase()} Pterodactyl Control Bot`,
        value: client.commands.groups.get(group).map( c => `\`${c.name}\``).join(', ')
      })
    }

    return message.channel.send(
      new MessageEmbed()
      .setAuthor(`Mai's full list of commands!`)
      .setDescription(
        `You may get the full detail of each command by typing \`${client.config.prefix}help <command>`
      )
      .addFields(fields)
      .setFooter(`Made by Bear#3437| \©️${new Date().getFullYear()} Tamako`)
      .setColor('GREY')
      )

  }
}
