var express = require('express');
var router = express.Router();

/* home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfolio' });
});

/* about page */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About me' });
});

/* projects page */
router.get('/projects', function(req, res, next) {
    res.render('projects', { title: 'Projects' });
});

/* services page */
router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Services' });
});

/* contact me page */

module.exports = router;