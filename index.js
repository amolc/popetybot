'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
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
        if (text === 'Rent In City Square') {
            propertyDetail(sender)
            continue
        }
        sendTextMessage(sender, "Popetybot:" + text.substring(0, 200))
      }
      if (event.postback) {
        let text = JSON.stringify(event.postback)
        sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
        continue
      }
    }
    res.sendStatus(200)
  })


function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function propertyDetail(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "City Square 2BHK",
                    "subtitle": "Rental Property",
                    "image_url": "http://www.propertyguru.com.sg/listing/19757160/for-rent-city-square-residences",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.popety.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "What amenties you require",
                    }],
                }, {
                    "title": "City Square 3BHK",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://www.propertyguru.com.sg/listing/20020393/for-rent-city-square-residences",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "What amenties you require",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
