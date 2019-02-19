const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')
const text = require('./text')

async function step2(ctx) {

  value.step1 = ctx.message.text
  console.log(value.step1)
  saveToDB(ctx, 1, value)
  let textBlockNumber = ctx.session.textBlockNumber ? ctx.session.textBlockNumber : 0;

	console.log('step 2')
	console.log(' ')
  
	ctx.reply(text.textBlocks[textBlockNumber].step2[0], null, Markup
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

module.exports = step2;