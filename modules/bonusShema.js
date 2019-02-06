const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let promoShema = new Schema({
    promo: {type: String, required: true, max: 30},
    used: {type: Boolean, required: true}
});
let Promo = mongoose.model('Promo', promoShema);

module.exports = Promo;
