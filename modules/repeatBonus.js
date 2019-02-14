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

function repeatBonus(cont, result, sku, link, age, ctx, data) {
	if (!result) {
		findEase(cont, result, sku, link, age, ctx)
  } else {
  	cont.reply(text.goodSearch[0] + result.Name + link + result.Slug + text.promo[0] + ctx.bonus + text.chips[0] + sku, null, Markup
	    .keyboard([
	      [
	        Markup.button(text.repeatBtnText[0], 'primary')
	      ]
	    ])
	    .oneTime());
	  // save films to user
  	data.films.push(result.Slug)
  	data.save((err) => {
			if (err) {
				console.log(err)
			}
		})
  }
  console.log(result)
}

module.exports = repeatBonus;