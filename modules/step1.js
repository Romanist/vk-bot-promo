const Markup = require('../lib/markup')

async function step1(ctx) {
	console.log('step 1')
	console.log(' ')

	ctx.reply('Отлично, я готов задать тебе первый вопрос.\n Скажи, сколько времени ты готов смотреть фильм?\n\n1 - Думаю, что найду часик времени на просмотр\n2 - Если там будет Гринч, то я готов смотреть 24/7\n3 - Ответ на этот вопрос ты узнаешь в следующей серии!\n4 - А можно всё посмотреть?', null, Markup
    .keyboard([
      [
        Markup.button('1', 'primary', 1),
        Markup.button('2', 'primary', 2),
        Markup.button('3', 'primary', 3), 
        Markup.button('4', 'primary', 4) 
      ]
    ])
    .oneTime());
}

module.exports = step1;