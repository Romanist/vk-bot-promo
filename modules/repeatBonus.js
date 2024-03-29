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

function repeatBonus(cont, result, sku, link, age, ctx, data, skuNumber) {
	if (!result) {
		findEase(cont, result, sku, link, age, ctx)
  } else {
  	link = result.Category == '1' ? text.movieLink[0] : text.seriesLink[0]
  	cont.reply(text.goodSearch[0] + result.Name + link + result.Slug + text.chips[0] + text.chipstaste[skuNumber], sku);
  	cont.reply(text.promo[0] + ctx.bonus + text.prefinal[0] + text.final[0], null, Markup
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
  // console.log(result)
}

module.exports = repeatBonus;