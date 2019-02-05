const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let User = require('./userShema')
let Film = require('./filmShema')
let Bonus = require('./bonusShema')

async function findFilm(ctx) {
	console.log('findfilm')
  let id = ctx.id;
  let value;
  let step;

  let promise = User.findOne({'id': id}, async function (err, user) {
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
  	// console.log(ctx)
  	generateFilm(ctx)
  }, err => {
    console.log('err', err)
  });
}

async function generateFilm(data) {
	let value = data.value
	console.log(value)
	// let promise = Film.find({'Genres': 'Мультфильм'}, function (err, user) {}).exec();
 //  promise.then(ctx => {
 //  	console.log(ctx)
 //  	// generateFilm(ctx)
 //  }, err => {
 //    console.log('err', err)
 //  });

 	let category = value.step1 === '1' ? 1 : ((value.step1 === '2') || (value.step1 === '4')) ? '' : 2;

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

 	let age = ((value.step1 === '1') || (value.step1 === '2') || (value.step1 === '3')) ? 100 : 6;

 	console.log('')
 	console.log(category)
 	console.log('')
 	console.log(genre1, genre2, genre3)
 	console.log('')
 	console.log(yearStart, yearEnd)
 	console.log('')
 	console.log(age)
 	console.log('')

  Film.count({'Production year': { $gte: yearStart, $lte: yearEnd }}).exec(function (err, count) {

	  // Get a random entry
	  var random = Math.floor(Math.random() * count)

	  // Again query all users but only fetch one offset by our random #
	  Film.findOne({
	  	'Production year': { $gte: yearStart, $lte: yearEnd }
	  }).skip(random).exec(
	    function (err, result) {
	      // Tada! random user
	      console.log(result) 
	    })
	})
}

module.exports = findFilm;