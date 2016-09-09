'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const bot = require('bot')
const token = "EAALxemZAA6IIBAA46GWCWVlQonE3vxthRzwEcRMiTU3vPygbFZCZCxJ6Wa3ABFi8jv4sTZBIkfqYF7BNirFMKHC53U5ZAbZCSC2Jszdep0OQkOom8cZCpTzPrKYpFcfTLnwK6FZAt2sEE9OrA7f69uOsCtZCcZCxZCNxvcgeIgUJopn1QZDZD"
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello I am Popety, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'Newton') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})
// Post Variable

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
      let event = req.body.entry[0].messaging[i]
      let sender = event.sender.id
      if (event.message && event.message.text) {
        let text = event.message.text
        //let n = text.search(/rent/i);
        if( text === "rent" || text ==="Rent"){
          bot.propertyDetail(sender)
          continue
        }else if( text === "Hello" || text === "hello" ){
            bot.sendTextMessage(sender, "Can you tell us if you are looking fors 1. Rent or 2. Sale")
            continue
        }else{
            bot.sendTextMessage(sender, "Thank you for contacting.Do visit http://www.popety.com")
            continue
        }
      }
      if (event.postback) {
        let text = JSON.stringify(event.postback)
        sendTextMessage(sender, "Postback received : "+text.substring(0, 200), token)
        continue
      }
    }
    res.sendStatus(200)
  })

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
