const express = require('express');
const bodyParser = require('body-parser');
const VkBot = require('./lib');
const Markup = require('./lib/markup');
const questObj = require('./questions');
const Session = require('./lib/session');
const Scene = require('./lib/scene');
const Stage = require('./lib/stage');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

//modules
let step0 = require('./modules/step0')
let step1 = require('./modules/step1')
let step2 = require('./modules/step2')
let step3 = require('./modules/step3')
let step4 = require('./modules/step4')
let checkDB = require('./modules/checkDB')
let saveToDB = require('./modules/saveToDB')
let renew = require('./modules/renew')
let checkAnswer = require('./modules/checkAnswer')
let findFilm = require('./modules/findFilm')
let errorMess = require('./modules/errorMess')
let saveStats = require('./modules/saveStats')
let refreshStats = require('./modules/refreshStats')
let text = require('./modules/text')

const app = express();
let mongoDB = 'mongodb://someuser:abcd1234@ds127961.mlab.com:27961/filmsforvoka';
// let mongoDB = 'mongodb://someuser:abcd1234@ds163694.mlab.com:63694/productstutorial';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

refreshStats()
var timerId = setInterval(function() {
  refreshStats()
}, 300000);

let User = require('./modules/userShema')
let value = require('./modules/value')

const bot = new VkBot({
  token: 'f6f4f511b58e60eead7622ec875a7036ba82058346d3736a18c3c717f88a0d72667c7057c3e4ea6c492cd',
  confirmation: 'd588faa9'
});

let numbOfQuestions = questObj.length;

const scene = new Scene('meet',
  (ctx) => {
    ctx.session.checkNumber = []
    ctx.session.step = 0;
    ctx.session.boolCheck = false;
    ctx.session.value = {};
    ctx.scene.next()
    step0(ctx)
  },
  (ctx) => {
    ctx.session.step = 1;
    ctx.session.boolCheck = false;
    if (checkAnswer(1, ctx)) {
      ctx.scene.next()
      step1(ctx)
    } else {
      if (ctx.session.boolCheck) step0(ctx)
      else errorMess(ctx)
    }
  },
  (ctx) => {
    ctx.session.step = 2;
    if ((checkAnswer(3, ctx) && (!ctx.session.boolCheck))) {
      step2(ctx)
    } else {
      if (ctx.session.boolCheck) step1(ctx, true)      
      else errorMess(ctx)     
    }
  },
  (ctx) => {
    ctx.session.step = 3;
    if ((checkAnswer(2, ctx) && (!ctx.session.boolCheck))) {
      step3(ctx)
    } else {
      ctx.scene.step=3
      if (ctx.session.boolCheck) step2(ctx, true)
      else errorMess(ctx)
    }
  },
  (ctx) => {
    ctx.session.step = 4;
    if ((checkAnswer(2, ctx) && (!ctx.session.boolCheck))) {
      step4(ctx)
    } else {
      ctx.scene.step=4
      if (ctx.session.boolCheck) step3(ctx, true)
      else errorMess(ctx)
    }
  },
  (ctx) => {
    ctx.session.step = 5;
    if ((checkAnswer(2, ctx) && (!ctx.session.boolCheck))) {
      value.step4 = ctx.message.text
      saveStats(ctx, 'finished')
      ctx.reply(text.waiting[0])
      console.log(value.step4)
      saveToDB(ctx, 4, value)
    } else {
      ctx.scene.step=5
      if (ctx.session.boolCheck) step4(ctx, true)
      else errorMess(ctx)
    }
  },
  (ctx) => {
    console.log('ctx.scene.step: ', ctx.scene.step)
    ctx.session.step = 6;
    ctx.scene.leave()
    ctx.scene.enter('meet', 1)
  }
)

const session = new Session()
const stage = new Stage(scene)

bot.use(session.middleware())
bot.use(stage.middleware())

bot.on((ctx) => {
  console.log(' ')
  console.log('_____________________________________')
  console.log(' ')
  checkDB(ctx)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/', bot.webhookCallback);

app.listen(2200);