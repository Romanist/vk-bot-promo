const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')
const text = require('./text')

async function step3(ctx) {

  value.step2 = ctx.message.text
  console.log(value.step2)
  saveToDB(ctx, 2, value)

	console.log('step 3')
	console.log(' ')

	ctx.reply(text.step3[0], null, Markup
    .keyboard([
      [
        Markup.button('1', 'primary', 1),
        Markup.button('2', 'primary', 2),
        Markup.button('3', 'primary', 3), 
        Markup.button('4', 'primary', 4) 
      ]
    ])
    .oneTime());
}

module.exports = step3;