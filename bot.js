var bot = {

  sendTextMessage: function (req,res,sender,text) {
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
  },

  propertyDetail: function (req, res,sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "City Square 2BHK",
                    "subtitle": "S$3500",
                    "image_url": "https://sg1-cdn.pgimgs.com/listing/19757160/UPHO.75407308.V800/City-Square-Residences-Farrer-Park-Serangoon-Rd-Singapore.jpg",
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
                    "subtitle": "Rental 3BHK 4500",
                    "image_url": "https://sg2-cdn.pgimgs.com/listing/19757160/UPHO.75407323.V800/City-Square-Residences-Farrer-Park-Serangoon-Rd-Singapore.jpg",
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
  },

};

module.exports = bot;
