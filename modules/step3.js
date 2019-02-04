const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')

async function step3(ctx) {

  value.step2 = ctx.message.text
  console.log(value.step2)
  saveToDB(ctx, 2, value)

	console.log('step 3')
	console.log(' ')

	ctx.reply('Представь, что тебя пригласили на крутую вечеринку. Как бы ты к ней готовился/лась​?\n\n1 - Возьму с собой джинсы «варёнки» и огромный диско-шар.\n2 - Я надену свой лучший малиновый пиджак и принесу альбом группы «Иванушки Int»\n3 - Уже слушаю трек «фристайло» и готовлюсь к баттлам по брейк-дансу. \n4 - Буду на стиле и соберу миллионы лайков под фотографией.', null, Markup
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

module.exports = step3;