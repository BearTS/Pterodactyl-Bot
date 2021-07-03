const { Client } = require('discord.js')
const CommandManager = require('./CommandManager')

module.exports = class TamakoClient extends Client{
    constructor({ clientSettings, prefix, commandgroups, token, owners,  bootTimeStart }){
        super(clientSettings);
        this.bootTimeStart = bootTimeStart
        this.messages = { received: 0, sent: 0}
        this.commands = new CommandManager({ groups: commandgroups })
        this.config = { prefix, token, owners, commanddir: commandgroups, pings: {},
            github: 'https://github.com/BearTS/Pterodactyl-v1-DiscordBot',
            website: 'https://tamako.tech'
         }
    }

    connect(){

      if (this.database) this.database.init()
      this.login(this.config.token)
        .then(()=> {
          console.log('Successfully Logged In! Waiting for the Client to become ready...')
        }).catch(console.error)
    }
}
