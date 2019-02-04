const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: {type: String, required: true, max: 30},
    value: {
      step1: 0,
      step2: 0,
      step3: 0,
      step4: 0
    },
    step: {type: Number, required: true},
    first_name: {type: String},
    last_name: {type: String}
});
let User = mongoose.model('User', UserSchema);

module.exports = User;