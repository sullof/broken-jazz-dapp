const Discord = require('discord.js')
const bot = new Discord.Client()

bot.login(require('../../env.json').token)

bot.on('ready', () => {

})

bot.on('message', msg => {

  // executeCommand(msg)
})

// async function executeCommand(msg) {
//
//   let content = _.trim(msg.content.replace(/<[^>]+>/g, ''))s
//
//   if (/^\/brokenjazz/.test(content)) {
//
//     content = _.trim(content.replace(/^\/brokenjazz /, '')).split(/ +/)
//
//     let message = 'Whoops. Try `/brokenjazz help`'
//
//     if (content[0] === 'help') {
//       message = `Examples:
//   /brokenjazz claims       (gives info about pending claims)
// `
//     } else if (content[0] === 'claims') {
//
//       console.info(message)
//       msg.channel.send(message)
//     }
//
//   }
// }

bot.sendMessage = message => {
  bot.channels.cache.get('825085825116930059').send(message)
}

module.exports = bot
