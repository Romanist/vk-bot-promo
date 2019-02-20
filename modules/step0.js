const request = require('request-promise')
const Markup = require('../lib/markup')
const text = require('./text')

async function step0(ctx) {
	console.log('step 0')
	console.log(' ')
	
	let options = {
      method: 'GET',
      uri: 'https://api.vk.com/method/users.get?user_id=' + ctx.message.from_id + '&v=5.52&access_token=f6f4f511b58e60eead7622ec875a7036ba82058346d3736a18c3c717f88a0d72667c7057c3e4ea6c492cd'
    }
    request(options)
      .then(async function (context) {
      		context = JSON.parse(context)
          let first_name = context.response[0].first_name;
          // text
          ctx.reply(text.step0[0] + first_name + text.step0[1], null, Markup
				    .keyboard([
				      [
				        Markup.button('Начнём!', 'primary', 'Начнём!')
				      ]
				    ])
				    .oneTime());
      })
      .catch(function (err) {
          console.log('err ', err)
      })  
	 
}

module.exports = step0;