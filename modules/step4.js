const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')

async function step4(ctx) {

  value.step3 = ctx.message.text
  console.log(value.step3)
  saveToDB(ctx, 3, value)
  
  console.log('step 4')
  console.log(' ')

	ctx.reply('У меня уже есть пару идей, но пока попрошу тебя ответить на последний вопрос. Какое хобби тебе подходит?\n\n1 - Занимаюсь сёрфингом в интернете.\n2 - Пересматриваю фильмы братьев Люмьеров.\n3 - Участвую в чемпионатах по хрусту чипсами Lay’s.\n4 - Расчёсывать гриву пони.', null, Markup
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

module.exports = step4;