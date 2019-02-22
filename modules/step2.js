const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')
let saveStats = require('./saveStats')
const text = require('./text')

async function step2(ctx, bool) {

  
  console.log('step1')
  console.log(' ')
  // console.log(value.step1, !bool)
  if (bool === true) {
    console.log('nosave!')
  }
  else if (!bool) {
    value.step1 = ctx.message.text
    saveToDB(ctx, 1, value)
    saveStats(ctx, 'started')
  }
  let textBlockNumber = ctx.session.textBlockNumber ? ctx.session.textBlockNumber : 0;
  // console.log(textBlockNumber, ctx.session.textBlockNumber)

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

  ctx.session.boolCheck = false
}

module.exports = step2;