const Markup = require('../lib/markup')
let saveToDB = require('../modules/saveToDB')
let value = require('./value')

async function step2(ctx) {

  value.step1 = ctx.message.text
  console.log(value.step1)
  saveToDB(ctx, 1, value)

	console.log('step 2')
	console.log(' ')
  
	ctx.reply('У меня уже есть парочка идей. Но пока задам тебе вопрос о твоей тайной жизни в кино.\nЕсли бы известный режиссер предложил тебе оскароносную роль в кино, то какая бы тебе подошла?\n\n1 - Оу, уровень моей харизмы зашкаливает и да, я могу рассмешить любого!\n2 - Мне очень подходят костюмы с бабочкой и взрывающиеся автомобили на заднем плане.\n3 - Хмм, не знаю, но круги на полях я уже нарисовал.\n4 - Этому миру мало драмы.', null, Markup
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

module.exports = step2;