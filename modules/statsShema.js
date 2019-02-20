const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let statsShema = new Schema({
    usedBonuses: {type: Number, required: true},
    uniqUser: {type: Number, required: true},
    uniqPassing: {type: Number, required: true},
    everyPassing: {type: Number, required: true},
    uniqPassed: {type: Number, required: true},
});
let Stats = mongoose.model('Stats', statsShema);

module.exports = Stats;
