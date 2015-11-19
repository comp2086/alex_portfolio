/*
File name: users.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: router for /users
*/

var User = require('mongoose').model('User'),
passport = require('passport'),
express = require('express'),
router = express.Router();

// Authentication check
function requireAuth(req, res, next){
  if(!req.isAuthenticated()) {
    return res.redirect('/signup');
  }
  next();
}

// Users home page
router.get('/', requireAuth, function(req, res, next) {
  // Get all users
  User.find(function(err, users) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('users/index', {
        title: 'Business contact list',
        activeUser: req.user,
        editUserID: false,
        usersCollection: users,
        username: req.user ? req.user.username : ''
      });
    }
  }).sort({ firstname : 1});
});

// Delete user page
router.get('/delete/:id', requireAuth, function(req, res, next) {
  var id = req.params.id;
  User.remove({ _id: id }, function(err) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/users');
    }
  });
});

// Add user page
router.get('/add', requireAuth, function(req, res, next) {
  res.render('users/add', {
    title: 'Add business contact',
    activeUser: req.user,
    username: req.user ? req.user.username : ''
  })
});

router.post('/add', requireAuth, function(req, res, next){
  var newUser = new User(req.body);
  var hashedPassword = newUser.generateHash(newUser.password);
  User.create({
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    username: newUser.username,
    email: newUser.email,
    password: hashedPassword,
    provider: 'local'
  }, function(err, user) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/users');
    }
  });
});

// Edit user page
router.get('/:id', requireAuth, function(req, res, next) {
  // Get the id
  var id = req.params.id;

  // Get all Users
  User.find(function(err, users) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('users/index', {
          title: 'Edit business contact list',
          activeUser: req.user,
          editUserID: id,
          usersCollection: users,
          username: req.user ? req.user.username : ''
      })
    } // End else
  });
});

// Edit user page, if user applied changes
router.post('/:id', requireAuth, function(req, res, next) {
  var id = req.params.id;
  var user = new User(req.body);
  user._id = id;
  user.updated = Date.now;

  // Update DB
  User.update({ _id: id }, user, function(err) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/users');
    }
  });
});

// Edit user page, if user discarded changes
router.get('/cancel', requireAuth, function(req, res, next) {
  res.redirect('/users');
});

module.exports = router;
