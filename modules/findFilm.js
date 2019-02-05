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
	let promise = User.find({'id': id}, function (err, user) {}).exec();
  promise.then(ctx => {
  	console.log(ctx)
  	// generateFilm(ctx)
  }, err => {
    console.log('err', err)
  });
}

module.exports = findFilm;