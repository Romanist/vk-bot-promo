const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request-promise')
const Schema = mongoose.Schema;

let filmShema = new Schema({
	Id: {type: String, required: true},
	Category: {type: Number, required: true},
	Name: {type: String, required: true},
	"Production year": {type: Number, required: true},
	Genres: {type: String},
	Genres2: {type: String},
	Genres3: {type: String},
	Age: {type: Number}
});
let Film = mongoose.model('Film', filmShema);

module.exports = Film;