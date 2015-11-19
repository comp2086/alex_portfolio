/*
File name: index.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: routes file
*/

var express = require('express');
var passport = require('passport');
var router = express.Router();
var user = require('../models/user');

// Email library and server
var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "comp2086@gmail.com",
    pass: "1234Test"
  }
});


// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',
  username: req.user ? req.user.username : '',
  activeUser: req.user,
  main_content: 'Hello and welcome to the portfolio of Alex Andriishyn, a Software Developer from Ukraine.',
  secondary_content: 'This is still a work in progress!',
  img_src: 'construction.png' });
});

// About page
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About me',
  username: req.user ? req.user.username : '',
  activeUser: req.user,
  main_content: '',
  secondary_content: '',
  img_src: 'construction.png'
});
});

// Projects page
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects',
  username: req.user ? req.user.username : '',
  activeUser: req.user
});
});

// Services page
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services',
  username: req.user ? req.user.username : '',
  activeUser: req.user
});
});

// Contact me page
router.get('/contactme', function(req, res, next) {
  res.render('contactme', { title: 'Contact me',
  username: req.user ? req.user.username : '',
  activeUser: req.user,
  emailSent: ''});
});

router.post('/contactme', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  // Send email
  transport.sendMail({
    from: email,
    to: 'alex.andriishyn@icloud.com',
    subject: 'Portfolio message from ' + name + ', ' + email,
    text: message
  }, function (err, resp) {
    if(err) {
      console.log(err);
    }
    else {
      res.render('contactme', { title: 'Contact me', emailSent: 'Your message has been sent'});
    }
  }
)});

// Sign in page
router.get('/signin', function(req, res, next) {
  if(!req.user) {
    res.render('signin', {
      title: 'Sign in',
      messages: req.flash('loginMessage'),
      username: req.user ? req.user.username : '',
      activeUser: req.user
    });
  }
  else {
    return res.redirect('/users');
  }
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/users',
  failureRedirect: 'signup',
  failureFlash: true
}));

// Sign up page
router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: 'Sign up',
    username: req.user ? req.user.username : '',
    activeUser: req.user
  });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/users',
  failureRedirect: 'signup',
  failureFlash: true
}))

// Logout
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
