function checkAnswer(check, ctx) {
	if (check === 1) {
		if ((ctx.message.text === 'go') ||
		    (ctx.message.text === 'го!') ||
		    (ctx.message.text === 'Го!') ||
		    (ctx.message.text === 'Го') ||
		    (ctx.message.text === 'Go') ||
		    (ctx.message.text === 'Go!') ||
		    (ctx.message.text === 'го') ||
		    (ctx.message.text === 'go!')) {
			return true;
		} else {
			return false;
		}
	} if (check === 2) {
		if ((ctx.message.text === '1') ||
		    (ctx.message.text === '2') ||
		    (ctx.message.text === '3') ||
		    (ctx.message.text === '4')) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = checkAnswer;