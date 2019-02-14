const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Markup = require('../lib/markup')
const text = require('./text')

const Schema = mongoose.Schema;

let User = require('./userShema')
let Film = require('./filmShema')
let Bonus = require('./bonusShema')

function findEase(cont, result, sku, link, age, ctx) {
	link = text.movieLink[0]
	options = {
		Age: { $gte: 0, $lte: age },
		Category: 1,
  	Genres: {$ne: 'Мультфильм'},
  	Genres2: {$ne: 'Мультфильм'},
  	Genres3: {$ne: 'Мультфильм'}
  }

	Film.count(options).exec(function (err, count) {

	  var random = Math.floor(Math.random() * count)

	  Film.findOne(options).skip(random).exec(
	    function (err, result) {
      	cont.reply(text.badSearch[0] + result.Name + link + result.Slug + text.promo[0] + ctx.bonus + text.chips[0] + sku, null, Markup
		    .keyboard([
		      [
		        Markup.button(text.repeatBtnText[0], 'primary')
		      ]
		    ])
		    .oneTime());
	    })
	})
}

module.exports = findEase;