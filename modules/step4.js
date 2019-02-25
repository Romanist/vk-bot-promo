const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')
const text = require('./text')

async function step4(ctx, bool) {

  if (!ctx.session.value) ctx.session.value = {}

  if (!bool) {
    value.step3 = ctx.message.text
    ctx.session.value.step3 = ctx.message.text
    saveToDB(ctx, 3, value)
  }

  let textBlockNumber = ctx.session.textBlockNumber ? ctx.session.textBlockNumber : 0;

	ctx.reply(text.textBlocks[textBlockNumber].step4[0], null, Markup
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

module.exports = step4;