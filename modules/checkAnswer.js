function checkAnswer(check, ctx) {
	if (check === 1) {
		return true;
	} if (check === 2) {
		if ((ctx.message.text === '1') ||
		    (ctx.message.text === '2') ||
		    (ctx.message.text === '3') ||
		    (ctx.message.text === '4')) {
			return true;
		} else {
			return false;
		}
	} if (check === 3) {
		if ((ctx.message.text === '1') ||
		    (ctx.message.text === '2') ||
		    (ctx.message.text === '3')) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = checkAnswer;