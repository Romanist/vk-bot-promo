const text = require('./text')
const Markup = require('../lib/markup')

async function errorMess(ctx) {

	ctx.session.boolCheck = true;
  
	ctx.reply(text.error[0], null, Markup
    .keyboard([
      [
        Markup.button('Продолжить', 'primary')
      ]
    ])
    .oneTime());

}

module.exports = errorMess;