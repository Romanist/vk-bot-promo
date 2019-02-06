const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;
const Markup = require('../lib/markup')

let User = require('./userShema')
let Film = require('./filmShema')
let Bonus = require('./bonusShema')

let generateBonus = require('./generateBonus')

async function findFilm(ctx, cont) {
	console.log('findfilm')
  let id = ctx.id;
  let value;
  let step;
  let _ctx = ctx;

  let promise = User.findOne({'id': id}, async function (err, user) {
    if (err) {
      if(err.code == 11000) {
        return console.log('null here', null);
      }
      else {
        return console.log('error', null);
      }
    }
    if (!user) {
      console.log('noUSER')
      ctx.scene.leave()
			ctx.scene.enter('meet', 1)
    }   
  }).exec();

   promise.then(ctx => {
  	console.log(ctx)
  	console.log(ctx.hasBonus)
    if (!ctx) {
      _ctx.scene.leave()
			_ctx.scene.enter('meet', 1)
    } else {
    	if (ctx.hasBonus) {
    		console.log('already has bonus')
    		generateFilm2(ctx, _ctx, cont)
    	}
    	else {
    		console.log('has bonus not')
    		ctx.hasBonus = true
    		ctx.save((err) => {
					if (err) {
						console.log(err)
					}
				})
    		generateFilm(ctx, _ctx, cont)
    	}
    }
  }, err => {
    console.log('err', err)
  });
}

async function generateFilm(data, ctx, cont) {
	let value = data.value
	let _ctx = ctx
	console.log(value)

 	let category = (value.step1 === '3') ? 2 : 1;

 	let genre1 = value.step2 === '1' ? 'Комедия' :
 		value.step2 === '2' ? 'Триллер' : 
 		value.step2 === '3' ? 'Ужасы' : 'Драма';
 	let genre2 = value.step2 === '1' ? 'Комедия' :
 		value.step2 === '2' ? 'Боевик' : 
 		value.step2 === '3' ? 'Фантастика' : 'Мелодрама';
 	let genre3 = value.step2 === '1' ? 'Комедия' :
 		value.step2 === '2' ? 'Криминал' : 
 		value.step2 === '3' ? 'Ужасы' : 'Драма';

 	let yearStart = value.step3 === '1' ? 0 : 
 		value.step3 === '2' ? 1990 : 
 		value.step3 === '3' ? 2000 : 2010;
 	let yearEnd = value.step3 === '1' ? 1989 : 
 		value.step3 === '2' ? 1999 : 
 		value.step3 === '3' ? 2009 : 2019;

 	let age = value.step4 === '4' ? 6 : 100;

 	console.log('')
 	console.log(category)
 	console.log('')
 	console.log(genre1, genre2, genre3)
 	console.log('')
 	console.log(yearStart, yearEnd)
 	console.log('')
 	console.log(age)
 	console.log('')

  Film.count({
  	'Production year': { $gte: yearStart, $lte: yearEnd },
  	Category: category,
  	Age: { $gte: 0, $lte: age },
  	$or: [
  		{Genres: genre1},
  		{Genres: genre3},
  		{Genres: genre2},
  		{Genres2: genre1},
  		{Genres2: genre2},
  		{Genres2: genre3},
  		{Genres3: genre1},
  		{Genres3: genre2},
  		{Genres3: genre3}
  	]
  }).exec(function (err, count) {

	  var random = Math.floor(Math.random() * count)

	  Film.findOne({
	  	'Production year': { $gte: yearStart, $lte: yearEnd },
	  	Category: category,
	  	Age: { $gte: 0, $lte: age },
	  	$or: [
	  		{Genres: genre1},
	  		{Genres: genre3},
	  		{Genres: genre2},
	  		{Genres2: genre1},
	  		{Genres2: genre2},
	  		{Genres2: genre3},
	  		{Genres3: genre1},
	  		{Genres3: genre2},
	  		{Genres3: genre3}
	  	]
	  }).skip(random).exec(
	    function (err, result) {
      	generateBonus(cont, result)
	      console.log(result)
	      console.log('')
	      console.log('')
	      // cont.scene.leave();
	    })
	})
}

async function generateFilm2(data, ctx, cont) {
	let value = data.value
	let _ctx = ctx
	console.log(value)

 	let category = (value.step1 === '3') ? 2 : 1;

 	let genre1 = value.step2 === '1' ? 'Комедия' :
 		value.step2 === '2' ? 'Триллер' : 
 		value.step2 === '3' ? 'Ужасы' : 'Драма';
 	let genre2 = value.step2 === '1' ? 'Комедия' :
 		value.step2 === '2' ? 'Боевик' : 
 		value.step2 === '3' ? 'Фантастика' : 'Мелодрама';
 	let genre3 = value.step2 === '1' ? 'Комедия' :
 		value.step2 === '2' ? 'Криминал' : 
 		value.step2 === '3' ? 'Ужасы' : 'Драма';

 	let yearStart = value.step3 === '1' ? 0 : 
 		value.step3 === '2' ? 1990 : 
 		value.step3 === '3' ? 2000 : 2010;
 	let yearEnd = value.step3 === '1' ? 1989 : 
 		value.step3 === '2' ? 1999 : 
 		value.step3 === '3' ? 2009 : 2019;

 	let age = value.step4 === '4' ? 6 : 100;

 	console.log('')
 	console.log(category)
 	console.log('')
 	console.log(genre1, genre2, genre3)
 	console.log('')
 	console.log(yearStart, yearEnd)
 	console.log('')
 	console.log(age)
 	console.log('')

  Film.count({
  	'Production year': { $gte: yearStart, $lte: yearEnd },
  	Category: category,
  	Age: { $gte: 0, $lte: age },
  	$or: [
  		{Genres: genre1},
  		{Genres: genre3},
  		{Genres: genre2},
  		{Genres2: genre1},
  		{Genres2: genre2},
  		{Genres2: genre3},
  		{Genres3: genre1},
  		{Genres3: genre2},
  		{Genres3: genre3}
  	]
  }).exec(function (err, count) {

	  var random = Math.floor(Math.random() * count)

	  Film.findOne({
	  	'Production year': { $gte: yearStart, $lte: yearEnd },
	  	Category: category,
	  	Age: { $gte: 0, $lte: age },
	  	$or: [
	  		{Genres: genre1},
	  		{Genres: genre3},
	  		{Genres: genre2},
	  		{Genres2: genre1},
	  		{Genres2: genre2},
	  		{Genres2: genre3},
	  		{Genres3: genre1},
	  		{Genres3: genre2},
	  		{Genres3: genre3}
	  	]
	  }).skip(random).exec(
	    function (err, result) {
	    	// generateBonus(cont)
	      // Tada! random user
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
	      console.log(result)
	      // cont.scene.leave();
	    })
	})
}

module.exports = findFilm;