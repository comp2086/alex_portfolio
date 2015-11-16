/*
File name: index.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: routes file
*/

var express = require('express');
var router = express.Router();

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
                        main_content: 'Hello and welcome to the portfolio of Alex Andriishyn, a Software Developer from Ukraine.',
                        secondary_content: 'This is still a work in progress!',
                        img_src: 'construction.png' });
});

// About page
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About me',
                        main_content: '',
                        secondary_content: '',
                        img_src: 'construction.png'});
});

// Projects page
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects',
                        });
});

// Services page
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

// Contact me page
router.get('/contactme', function(req, res, next) {
  res.render('contactme', { title: 'Contact me',
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

// Login page
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign In'});
});

module.exports = router;
