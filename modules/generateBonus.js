const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;
const Markup = require('../lib/markup')

let User = require('./userShema')
let Film = require('./filmShema')
let Bonus = require('./bonusShema')

async function generateBonus(cont, result, sku) {
	console.log('')
	console.log('generation', result)
	console.log('')
	let userID = cont.message.from_id
	console.log('generation', userID)

  let promise = Bonus.findOne({'used': false}, async function (err, user) {
    if (err) {
      if(err.code == 11000) {
        return console.log('null here', null);
      }
      else {
        return console.log('error', null);
      }
    } 
  }).exec();

  promise.then(ctx => {	  	
    if (!ctx) {
      console.log('____________________________________')
      console.log('out of codes!')
      console.log('____________________________________')
      if (!result) {
      	cont.reply('Хмм, я ещё не нашёл идеальный фильм для тебя. Попробуй пройти тест ещё раз или выбери нужный тебе фильм по подарочному промокоду на сервисе VOKA.​', null, Markup
			    .keyboard([
			      [
			        Markup.button('выбрать новый фильм', 'primary')
			      ]
			    ])
			    .oneTime());
      } else {
      	cont.reply('Мне кажется, я узнал тебя чуточку лучше и подобрал фильм, который тебе подойдет\n\nТы готов? Тогда лови​: "' + result.Name + '" \n\nhttps://www.voka.tv/movies/' + result.Slug + '\n', null, Markup
			    .keyboard([
			      [
			        Markup.button('выбрать новый фильм', 'primary')
			      ]
			    ])
			    .oneTime());
      }
    } else {
    	ctx.used = true
	  	ctx.save((err) => {
				if (err) {
					console.log(err)
				}
			});

			if (!result) {
				cont.reply('Хмм, я ещё не нашёл идеальный фильм для тебя. Попробуй пройти тест ещё раз или выбери нужный тебе фильм по подарочному промокоду на сервисе VOKA.​\n' + ctx.promo, null, Markup
			    .keyboard([
			      [
			        Markup.button('выбрать новый фильм', 'primary')
			      ]
			    ])
			    .oneTime());
			} else {
				cont.reply('Мне кажется, я узнал тебя чуточку лучше и подобрал фильм, который тебе подойдет\n\nТы готов? Тогда лови​: "' + result.Name + '" \n\nhttps://www.voka.tv/movies/' + result.Slug + '\n\nАх, да, самое приятное! Держи свой персональный промокод на подписку от VOKA:\n' + ctx.promo + '\n\nЯ уверен, тебе понравится. А чтобы точно понравилось, попробуй к этом фильму вкус чипсов:\n' + sku, null, Markup
			    .keyboard([
			      [
			        Markup.button('выбрать новый фильм', 'primary')
			      ]
			    ])
			    .oneTime());
			    User.findOne({id: userID}, function (err, user) {
				    user.bonus = ctx.promo;

				    user.save(function (err) {
				        if(err) {
				            console.error('ERROR!');
				        }
				    });
				});
			}	    	
    }
  }, err => {
    console.log('err', err)
  });
}

module.exports = generateBonus;