const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')
let saveStats = require('./saveStats')
const text = require('./text')

async function step2(ctx, bool) {

  if (!ctx.session.value) ctx.session.value = {}

  if (!bool) {
    value.step1 = ctx.message.text
    ctx.session.value.step1 = ctx.message.text
    saveToDB(ctx, 1, value)
    saveStats(ctx, 'started')
  }

  let textBlockNumber = ctx.session.textBlockNumber ? ctx.session.textBlockNumber : 0;
  
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