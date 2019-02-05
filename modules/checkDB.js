const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let User = require('./userShema')

async function checkDB(ctx) {
  let id = ctx.message.from_id;
  let value;
  let step;
  let contextScene = ctx.scene;

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
      console.log('noUSER')
      try {
        let user = new User(
          {
            id: id,
            value: {
              step1: 0,
              step2: 0,
              step3: 0,
              step4: 0
            },
            step: 0
          }
        );
        let options = {
          method: 'GET',
          uri: 'https://api.vk.com/method/users.get?user_id=' + id + '&v=5.52&access_token=f6f4f511b58e60eead7622ec875a7036ba82058346d3736a18c3c717f88a0d72667c7057c3e4ea6c492cd'
        }
        request(options)
          .then(async function (context) {
              context = JSON.parse(context)
              user.first_name = context.response[0].first_name;
              user.last_name = context.response[0].last_name;
              let saveUser = await user.save(function (err) {
                if (err) {
                  return next(err);
                }
              });
              await saveUser;
          })
          .catch(function (err) {
              console.log('err ', err)
          })      
      } catch (err) {
        console.log('err', err)
      }
    }   
  }).exec();
  promise.then(ctx => {
    if (!ctx) {
      var curStep = 0
    } else curStep = ctx.step ? ctx.step : 0;
    if (curStep) {
      curStep = curStep + 2
      // contextScene.value = 
      console.log(ctx)
      contextScene.enter('meet', [curStep])
    } else {
      contextScene.enter('meet')
    }    
  }, err => {
    console.log('err', err)
  });
}

module.exports = checkDB;