var express = require('express.io');
var app = express().http().io()

//var router = express.Router();
var crossword = require('../crossword')

/* GET home page. */
app.get('/', function(req, res, next) {
  grid = new crossword.Grid()
  res.render('index', { title: 'Crossy Words' , grid: grid});
});


module.exports = app;
