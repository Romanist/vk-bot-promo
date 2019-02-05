const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let bonusShema = new Schema({
    promo: {type: String, required: true, max: 30},
    used: {type: Boolean, required: true}
});
let Bonus = mongoose.model('Bonus', bonusShema);

module.exports = Bonus;
