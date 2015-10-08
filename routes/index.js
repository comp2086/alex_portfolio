/*
File name: index.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: routes file
*/
var express = require('express');
var router = express.Router();

/* Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* About page */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About me' });
});

/* Projects page */
router.get('/projects', function(req, res, next) {
    res.render('projects', { title: 'Projects' });
});

/* Services page */
router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Services' });
});

/* Contact me page */


module.exports = router;