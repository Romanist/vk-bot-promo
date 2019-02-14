const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')
const text = require('./text')

async function step4(ctx) {

  value.step3 = ctx.message.text
  console.log(value.step3)
  saveToDB(ctx, 3, value)
  
  console.log('step 4')
  console.log(' ')

	ctx.reply(text.step4[0], null, Markup
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

module.exports = step4;