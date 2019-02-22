const Markup = require('../lib/markup')
const text = require('./text')

async function step1(ctx, bool) {

	let textBlockNumber = ctx.session.textBlockNumber ? ctx.session.textBlockNumber : 0

  if (!bool) {
    checkArray(textBlockNumber)
    textBlockNumber = Math.floor(Math.random() * 4)
  }
  
  function checkArray(item) {
    if ((!ctx.session.checkNumber) || (ctx.session.checkNumber.length >= 3)) {
      ctx.session.checkNumber = []
    }
    if (ctx.session.checkNumber.includes(item)) {
      textBlockNumber = Math.floor(Math.random() * 4)
      checkArray(textBlockNumber)
    } else {
      ctx.session.checkNumber.push(textBlockNumber)
      ctx.session.textBlockNumber = textBlockNumber
    }
  }  

	console.log('step 1')
	console.log(' ')

	ctx.reply(text.textBlocks[ctx.session.textBlockNumber].step1[0], null, Markup
    .keyboard([
      [
        Markup.button('1', 'primary', 1),
        Markup.button('2', 'primary', 2),
        Markup.button('3', 'primary', 3)
      ]
    ])
    .oneTime());

	ctx.session.boolCheck = false
}

module.exports = step1;