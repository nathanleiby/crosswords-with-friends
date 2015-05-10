var express = require('express.io');
var app = express().http().io()

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('Users');
});

module.exports = app;
