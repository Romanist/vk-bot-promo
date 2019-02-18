const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let statsShema = new Schema({
    bonuses: {type: Number, required: true},
    user0th: {type: Number, required: true},
    user1st: {type: Number, required: true},
    user1stStarts: {type: Number, required: true},
    user5th: {type: Number, required: true},
});
let Stats = mongoose.model('Stats', statsShema);

module.exports = Stats;
