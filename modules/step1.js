const Markup = require('../lib/markup')
const text = require('./text')

async function step1(ctx, bool) {

	let textBlockNumber = Math.floor(Math.random() * 4)
	
	
	function checkArray(item) {
		console.log('')
		console.log(ctx.session.checkNumber)
		if (!ctx.session.checkNumber) ctx.session.checkNumber = []
		console.log(ctx.session.checkNumber)
		console.log(ctx.session.checkNumber.length)
		console.log(ctx.session.checkNumber.length >= 3)
		if (ctx.session.checkNumber.length >= 3) {
			ctx.session.checkNumber = []
		}
		if (ctx.session.checkNumber.includes(item)) {
			textBlockNumber = Math.floor(Math.random() * 4)
			checkArray(textBlockNumber)
		}
		ctx.session.checkNumber.push(textBlockNumber)
		console.log('')
		console.log(textBlockNumber)
		console.log('')
		console.log(ctx.session.checkNumber)
		console.log('')
	}

	checkArray(textBlockNumber)
  

	console.log('step 1')
	console.log(' ')

	ctx.reply(text.textBlocks[textBlockNumber].step1[0], null, Markup
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