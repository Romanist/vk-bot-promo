const text = require('./text')

async function errorMess(ctx) {
  
	ctx.reply(text.error[0])

}

module.exports = errorMess;