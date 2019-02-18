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
let Stats = require('./statsShema')

function refreshStats() {

	let promRdy = false;
	let promRdy2 = false;
	let promRdy3 = false;
	let promRdy4 = false;
	let promRdy5 = false;

	let bonuses,
		user5th,
		user0th,
		user1st,
		user1stStarts;

	function checkRdy() {
		if (promRdy && promRdy2 && promRdy3 && promRdy4 && promRdy5) {
			sendStatsToDB()
		}
	}

  let promise = User.find({'hasBonus': true}, async function (err, user) {
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
    }   
  }).exec();
  promise.then(ctx => {
    if (!ctx) {
      console.log('noUSER')
    } else {
    	// HERE 5th step
    	console.log('5-th ', ctx.length)
    	user5th = ctx.length;
    	promRdy = true;
    	checkRdy();
    }
  }, err => {
    console.log('err', err)
  });

  let promise2 = Bonus.find({'used': true}, async function (err, user) {
    if (err) {
      if(err.code == 11000) {
        return console.log('null here', null);
      }
      else {
        return console.log('error', null);
      }
    }
    if (!user) {
      console.log('noBonus')
    }   
  }).exec();
  promise2.then(ctx => {
    if (!ctx) {
      console.log('noBonus')
    } else {
    	// HERE Bonuses
    	console.log('bonuses ', ctx.length)
    	bonuses = ctx.length;
    	promRdy2 = true;
    	checkRdy();
    }
  }, err => {
    console.log('err', err)
  });

  let promise3 = User.find(async function (err, user) {
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
    }   
  }).exec();
  promise3.then(ctx => {
    if (!ctx) {
      console.log('noUSER')
    } else {
    	// HERE 0th uniq
    	console.log('0-th ', ctx.length)
    	user0th = ctx.length;
    	promRdy3 = true;
    	checkRdy();
    }
  }, err => {
    console.log('err', err)
  });

  let promise4 = User.find({'isStarted': true}, async function (err, user) {
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
    }   
  }).exec();
  promise4.then(ctx => {
    if (!ctx) {
      console.log('noUSER')
    } else {
    	// HERE 1th step
    	console.log('1th ', ctx.length)
    	user1st = ctx.length;
    	promRdy4 = true;
    	checkRdy();
    }
  }, err => {
    console.log('err', err)
  });

  let promise5 = User.find({'startCount': {$gte: 0}}, async function (err, user) {
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
    }   
  }).exec();
  promise5.then(ctx => {
    if (!ctx) {
      console.log('noUSER')
    } else {
    	// HERE 1th step
    	console.log('starts ')
    	promRdy5 = true;
    	user1stStarts = 0
    	ctx.map(function(item) {
    		user1stStarts = user1stStarts + item.startCount
    	})
    	console.log(user1stStarts)
    	checkRdy();
    }
  }, err => {
    console.log('err', err)
  });

  function sendStatsToDB() {
  	let promise = Stats.findOne(function (err, stats) {
	    if (err) {
	      if(err.code == 11000) {
	        return console.log('null here', null);
	      }
	      else {
	        return console.log('error', null);
	      }
	    }
	    if (!stats) {
	      let stats = new Stats(
	        {
					    bonuses: bonuses,
					    user0th: user0th,
					    user1st: user1st,
					    user1stStarts: user1stStarts,
					    user5th: user5th,
					}	      
				);
	      stats.save(function (err) {
	        if (err) {
	          console.log(err);
	        }
	      });
	    } else {
	      stats.bonuses = bonuses;
	      stats.user0th = user0th;
	      stats.user1st = user1st;
	      stats.user1stStarts = user1stStarts;
	      stats.user5th = user5th;
	      stats.save(function (err) {
	          if(err) {
	              console.error('ERROR!', err);
	          }
	      });
	    }
	  }).exec();
  }
}

module.exports = refreshStats;