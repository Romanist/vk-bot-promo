const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: {type: String},
    link : {type: String},
    arrivTime : {type: String},
    value: {
      step1: 0,
      step2: 0,
      step3: 0,
      step4: 0
    },
    step: {type: Number},
    first_name: {type: String},
    last_name: {type: String},
    bonus: {type: String},
    hasBonus: {type: Boolean},
    films: [String],
    isStarted: {type: Boolean},
    isFinished: {type: Boolean},
    startCount: {type: Number},
    finishCount: {type: Number}
});

let User = mongoose.model('User', UserSchema);

module.exports = User;