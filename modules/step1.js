const Markup = require('../lib/markup')
const text = require('./text')
let saveStats = require('./saveStats')

async function step1(ctx) {
	console.log('step 1')
	console.log(' ')
	saveStats(ctx, 'started')

	ctx.reply(text.step1[0], null, Markup
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