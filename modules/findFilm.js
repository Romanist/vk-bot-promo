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

const text = require('./text')

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

 	let category = (value.step1 === '2') ? 2 : 1;

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

 	let sku = value.step2 === '1' ? 'Комедия SKU' :
 		value.step2 === '2' ? 'Экшн SKU' : 
 		value.step2 === '3' ? 'Sci-fy SKU' : 'Романтика SKU';	

 	let link = (value.step1 === '2') ? text.seriesLink[0] : text.movieLink[0]

 	console.log('')
 	console.log(category)
 	console.log('')
 	console.log(genre1, genre2, genre3)
 	console.log('')
 	console.log(yearStart, yearEnd)
 	console.log('')
 	console.log(age)
 	console.log('')

 	let options = {
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
  	],
  	Genres: {$ne: 'Мультфильм'},
  	Genres2: {$ne: 'Мультфильм'},
  	Genres3: {$ne: 'Мультфильм'}
  }

  if (value.step1 === '3') {
  	options = {
	  	'Production year': { $gte: yearStart, $lte: yearEnd },
	  	$or: [
	  		{Category: 1},
	  		{Category: 2}
	  	],
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
	  	],
	  	Genres: {$ne: 'Мультфильм'},
	  	Genres2: {$ne: 'Мультфильм'},
	  	Genres3: {$ne: 'Мультфильм'}
	  }
  }

  Film.count(options).exec(function (err, count) {

	  var random = Math.floor(Math.random() * count)

	  Film.findOne(options).skip(random).exec(
	    function (err, result) {
      	generateBonus(cont, result, sku, link)
	      console.log('')
	      console.log('result ')
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
	console.log(' ')
	console.log('genfilm2')
	console.log(' ')
	// console.log(data)
	// console.log(' ')
	// console.log(ctx)
	// console.log(' ')
	// console.log(cont)

 	let category = (value.step1 === '2') ? 2 : 1;

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

 	let sku = value.step2 === '1' ? 'Комедия SKU' :
 		value.step2 === '2' ? 'Экшн SKU' : 
 		value.step2 === '3' ? 'Sci-fy SKU' : 'Романтика SKU';	

 	let link = (value.step1 === '2') ? text.seriesLink[0] : text.movieLink[0]

 	console.log('')
 	console.log(category)
 	console.log('')
 	console.log(genre1, genre2, genre3)
 	console.log('')
 	console.log(yearStart, yearEnd)
 	console.log('')
 	console.log(age)
 	console.log('')

 	let options = {
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
  	],
  	Genres: {$ne: 'Мультфильм'},
  	Genres2: {$ne: 'Мультфильм'},
  	Genres3: {$ne: 'Мультфильм'}
  }

  if (value.step1 === '3') {
  	options = {
	  	'Production year': { $gte: yearStart, $lte: yearEnd },
	  	$or: [
	  		{Category: 1},
	  		{Category: 2}
	  	],
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
	  	],
	  	Genres: {$ne: 'Мультфильм'},
	  	Genres2: {$ne: 'Мультфильм'},
	  	Genres3: {$ne: 'Мультфильм'}
	  }
  }

  Film.count(options).exec(function (err, count) {

	  var random = Math.floor(Math.random() * count)

	  Film.findOne(options).skip(random).exec(
	    function (err, result) {
	    	// generateBonus(cont)
	      // Tada! random user
	      if (!result) {
	      	cont.reply(text.badSearch[0] + text.promo[0] + ctx.bonus + text.chips[0] + sku, null, Markup
				    .keyboard([
				      [
				        Markup.button(text.repeatBtnText[0], 'primary')
				      ]
				    ])
				    .oneTime());
	      } else {
	      	cont.reply(text.goodSearch[0] + result.Name + link + result.Slug + text.promo[0] + ctx.bonus + text.chips[0] + sku, null, Markup
				    .keyboard([
				      [
				        Markup.button(text.repeatBtnText[0], 'primary')
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