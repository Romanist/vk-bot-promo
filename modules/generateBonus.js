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

async function generateBonus(cont, result, sku, link, age, skuNumber) {
	console.log('')
	console.log('generation', result)
	console.log('')
	let userID = cont.message.from_id
	console.log('generation', userID)
	console.log(' ')
	// console.log('LINK ', link)

  let promise = Bonus.findOne({'used': 'false'}, async function (err, user) {
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
				findEase(cont, result, sku, link, age, ctx)
      } else {
      	cont.reply(text.goodSearch[0] + result.Name + link + result.Slug + text.chips[0] + text.chipstaste[skuNumber] + text.final[0], sku, Markup
			    .keyboard([
			      [
			        Markup.button(text.repeatBtnText[0], 'primary')
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
				findEase(cont, result, sku, link, age, ctx)
			} else {
				cont.reply(text.goodSearch[0] + result.Name + link + result.Slug + text.promo[0] + ctx.promo + text.chips[0] + text.chipstaste[skuNumber] + text.final[0], sku, Markup
			    .keyboard([
			      [
			        Markup.button(text.repeatBtnText[0], 'primary')
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