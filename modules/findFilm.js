const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Markup = require('../lib/markup')
const text = require('./text')
const findEase = require('./findEase')

const Schema = mongoose.Schema;

let User = require('./userShema')
let Film = require('./filmShema')
let Bonus = require('./bonusShema')

let generateBonus = require('./generateBonus')
let repeatBonus = require('./repeatBonus')

async function findFilm(ctx, cont) {
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
      ctx.scene.leave()
			ctx.scene.enter('meet', 1)
    }   
  }).exec();

   promise.then(ctx => {
    if (!ctx) {
      _ctx.scene.leave()
			_ctx.scene.enter('meet', 1)
    } else {
    	generateFilm(ctx, _ctx, cont)
    }
  }, err => {
    console.log('err', err)
  });
}

async function generateFilm(data, ctx, cont) {
	let value = data.value
	let _ctx = ctx

	let category = (cont.session.value.step1 === '2') ? 2 : 1;

 	let genre1 = cont.session.value.step2 === '1' ? 'Комедия' :
 		cont.session.value.step2 === '2' ? 'Триллер' : 
 		cont.session.value.step2 === '3' ? 'Ужасы' : 'Драма';
 	let genre2 = cont.session.value.step2 === '1' ? 'Комедия' :
 		cont.session.value.step2 === '2' ? 'Боевик' : 
 		cont.session.value.step2 === '3' ? 'Фантастика' : 'Мелодрама';
 	let genre3 = cont.session.value.step2 === '1' ? 'Комедия' :
 		cont.session.value.step2 === '2' ? 'Криминал' : 
 		cont.session.value.step2 === '3' ? 'Ужасы' : 'Драма';

 	let yearStart = cont.session.value.step3 === '1' ? 0 : 
 		cont.session.value.step3 === '2' ? 1990 : 
 		cont.session.value.step3 === '3' ? 2000 : 2010;
 	let yearEnd = cont.session.value.step3 === '1' ? 1989 : 
 		cont.session.value.step3 === '2' ? 1999 : 
 		cont.session.value.step3 === '3' ? 2009 : 2019;

 	let age = cont.session.value.step4 === '4' ? 6 : 100;

 	let sku = cont.session.value.step2 === '1' ? 'https://vk.com/public177040120?z=photo-177040120_456239024%2Falbum-177040120_260066210' :
 		cont.session.value.step2 === '2' ? 'https://vk.com/public177040120?z=photo-177040120_456239025%2Falbum-177040120_260066210' : 
 		cont.session.value.step2 === '3' ? 'https://vk.com/public177040120?z=photo-177040120_456239027%2Falbum-177040120_260066210' : 'https://vk.com/public177040120?z=photo-177040120_456239026%2Falbum-177040120_260066210';
 	let skuNumber = cont.session.value.step2 === '1' ? 0 :
 		cont.session.value.step2 === '2' ? 1 : 
 		cont.session.value.step2 === '3' ? 2 : 3;

 	let link = (cont.session.value.step1 === '2') ? text.seriesLink[0] : text.movieLink[0]

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

  function search() {
		Film.count(options).exec(function (err, count) {

		  var random = Math.floor(Math.random() * count)

		  Film.findOne(options).skip(random).exec(
		    function (err, result) {
		    	if (!result) findEase(cont, result, sku, link, age, ctx, skuNumber)
		    	else {
		    		if (counter >= 10) {
			    		data.films = []
			    	}
			    	if ((data.films.includes(result.Slug)) && (counter < 10)) {
			    		search()
			    		return false
			    	}
			    	if (data.hasBonus) {
			    		repeatBonus(cont, result, sku, link, age, ctx, data, skuNumber)
			    	}	else {
		      		generateBonus(cont, result, sku, link, age, skuNumber)
			    		data.hasBonus = true
			    		data.save((err) => {
								if (err) {
									console.log(err)
								}
							})   
		      	}
		    	}			    	
		    })
		})
		counter++;
	}

	let counter = 0;
	search()
}	

module.exports = findFilm;