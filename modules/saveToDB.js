const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let User = require('./userShema')
let findFilm = require('./findFilm')

async function saveToDB(ctx, step, value) {
  let _ctx = ctx
  let contextScene = ctx.scene;
  let id = ctx.message.from_id;
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
      let user = new User(
        {
          id: id,
          value: value,
          step: step
        }
      );
      user.save(function (err) {
        if (err) {
          return next(err);
        }
      });
    } else {
      user.value = value;
      user.step = step;
      user.save(function (err) {
          if(err) {
              console.error('ERROR!', err);
          }
      });
    }
  }).exec();
  promise.then(ctx => {
    contextScene.next()
    if (step === 4) findFilm(ctx, _ctx)
  }, err => {
    console.log('err', err)
  });
}

module.exports = saveToDB;