const Markup = require('../lib/markup')
const text = require('./text')
let saveStats = require('./saveStats')

async function step1(ctx) {

	let textBlockNumber = Math.floor(Math.random() * 4)
  ctx.session.textBlockNumber = textBlockNumber; 

	console.log('step 1')
	console.log(' ')
  // console.log(ctx.session.textBlockNumber)
  // console.log(' ')
	saveStats(ctx, 'started')
  // let textBlockNumber = ctx.session.textBlockNumber ? ctx.session.textBlockNumber : 0;
  // console.log(' ')
  // console.log(textBlockNumber)

	ctx.reply(text.textBlocks[textBlockNumber].step1[0], null, Markup
    .keyboard([
      [
        Markup.button('1', 'primary', 1),
        Markup.button('2', 'primary', 2),
        Markup.button('3', 'primary', 3)
      ]
    ])
    .oneTime());
}

module.exports = step1;