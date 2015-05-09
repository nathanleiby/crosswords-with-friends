var express = require('express');
var router = express.Router();
var crossword = require('../crossword')

/* GET home page. */
router.get('/', function(req, res, next) {
  grid = new crossword.Grid()
  res.render('index', { title: 'Crossy Words' , grid: grid});
});

module.exports = router;
