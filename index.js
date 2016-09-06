const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'EAAOZANotcVcgBAFg5zY54PmEVX66iRZCG70mTy557ZBfYxZBOuVyWaUsjjzrIIsWcZAUekaZA1UzUiIsa4rVaK6DqXrgmuyzQiSSsRnoVSOYtJOEeGzB9xwR61pDqjvA2mAl1I2OUZBnKtcna3LZA6himGhZBIEQts3xwV8EptsOfJAZDZD',
  verify: 'popetymessenger',
  app_secret: '6fc2a42e53cb0b0dbf27051626effd8b'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
