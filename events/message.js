require('moment-duration-format')
const { MessageEmbed, Collection } = require('discord.js')
const CooldownManager = require('../struct/CooldownManager')
const { duration } = require('moment')
const { PermissionsCheck, CooldownsCheck } = require('../helper')

module.exports = async ( client, message ) => {

  const {
      user
    , commands
    , config: {
       prefix
      , owners
    }
  } = client



  if (
        message.content.toLowerCase() === 'prefix'
  ) return message.reply(`My prefix is **${prefix}**`)


  if (message.content.startsWith(prefix)){


    if (
      message.author.bot ||
      message.guild &&
      !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')
    ) return


    const [ commandName, ...arguments ] = message.content.slice(prefix.length).split(/ +/)

    const command = commands.get(commandName)

    if (!command) return

    const { name, cooldown, run } = command

//------------------------PERMISSIONS_CHECK---------------------------//

    try {

      const { status, embed } = PermissionsCheck(message, command)

      if (status === 'Denied')
      return message.channel.send(
        message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')
        ? embed
        : embed.description
      )


  //----------------------COOLDOWN CHECK--------------------------------//


      const { accept, timeLeft } = CooldownsCheck(message, command)

      if (!accept)
      return message.channel.send(
        `\u2000\u2000<:cancel:712586986216489011>\u2000\u2000|\u2000\u2000${
          message.author
        }, ${
          command.cooldown.message
          ? command.cooldown.message
          : 'You cannot use this command yet.'
        }\n⏳\u2000\u2000|\u2000\u2000Time left: ${
          duration(timeLeft,  'milliseconds')
            .format('D [days] H [hours] m [minutes] s [seconds]')
        }`
      )

      run(client, message, arguments)

  //-------------------------------------------------------------------//

    } catch (err) {

      const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription(
          '<:cancel:712586986216489011> | An error has occured while executing this command!'
         + '\n```xl\n'
         + err.stack.split('\n').splice(0,5).join('\n').split(process.cwd()).join('MAIN_PROCESS')
         + '\n\n...and '
         + (err.stack.split('\n').length - 5).toFixed()
         + 'lines more.\`\`\`\n'
         + 'A message was automatically created regarding this error and has been sent to my Developer...'
        )

      await message.channel.send(
        message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')
        ? embed
        : embed.description
      )

      await client.users.fetch('545427431662682112')
      .then(user => user.send(
        '<:cancel:712586986216489011> | An error has occured while executing a command on **'
        + message.guild.name
        + '!\n\`\`\`xl\nExecutor: '
        + message.author.tag
        + '\nChannel: '
        + message.channel.id
        + '\n\n'
        + err.stack.split('\n').splice(0,5).join('\n').split(process.cwd()).join('MAIN_PROCESS')
        + '\n\n...and '
        + (err.stack.split('\n').length - 5).toFixed()
        + 'lines more.```')
        ).catch(()=> null)
    }
  }
}
