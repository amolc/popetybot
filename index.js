const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'EAAOZANotcVcgBAM3PWZCKnDP3VSQ1FEXKO0Wa9iZAybounMWAGx2yynN6Q27MhZCEML54UmyspZB9iuogq5zmN132kMG3Qbk8FzUkRzOZA9i1juYSIYVkffQZCZAVaYAejMKHa2FaHvK8V2ojh2D6DMZACFdGtLAZAjAIjgCXTSu6qlAZDZD',
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

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  return bot._verify(req, res)
})

app.post('/', (req, res) => {
  bot._handleMessage(req.body)
  res.end(JSON.stringify({status: 'ok'}))
})

http.createServer(app).listen(3000)
