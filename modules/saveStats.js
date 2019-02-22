const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let User = require('./userShema')

async function saveStats(ctx, data) {
  let _ctx = ctx
  let contextScene = ctx.scene;
  let id = ctx.message.from_id;
  // console.log('_________________________________________________')
  // console.log('_________________________________________________')
  // console.log('SAVESTATS', data)
  // console.log('_________________________________________________')
  // console.log('_________________________________________________')

  let promise = User.findOne({'id': id}, function (err, user) {
    if (err) {
      if(err.code == 11000) {
        return console.log('null here', null);
      }
      else {
        return console.log('error', null);
      }
    }
    if (!user) {
      saveStats(ctx, data);
    } else {
      if (data === 'started') {
        user.isStarted = true
        user.startCount = user.startCount + 1
      }
      if (data === 'finished') {
        user.isFinished = true
        user.finishCount = user.finishCount + 1
      }
      user.save(function (err) {
          if(err) {
              console.error('ERROR!', err);
          }
      });
    }
  }).exec();
  promise.then(ctx => {

  }, err => {
    console.log('err', err)
  });
}

module.exports = saveStats;