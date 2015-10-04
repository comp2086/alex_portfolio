var express = require('express');
var router = express.Router();

/* home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfolio' });
});

/* about page */
router.get('/about', function(req, res, next) {
    res.render('about');
});

module.exports = router;