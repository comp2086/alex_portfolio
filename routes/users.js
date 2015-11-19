var user = require('mongoose').model('User'),
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

// Users index page
router.get('/', requireAuth, function(req, res, next) {
  user.find(function(err, users) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('users/index', {
        title: 'Business contact list',
        activeUser: req.user,
        usersCollection: users,
        username: req.user ? req.user.username : ''
      });
    }
  }).sort({ firstname : 1});
});

// Delete user page
router.get('/delete/:id', requireAuth, function(req, res, next) {
  var id = req.params.id;
  user.remove({ _id: id }, function(err) {
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

/*
this behaves strange, it fires up successRedirect but doesn't add anything,
however, 1/10 adds works for some reason..

router.post('/add', passport.authenticate('local-signup', {
  successRedirect: '/users',
  failureRedirect: 'add',
  failureFlash: true
}));
*/
router.post('/add', requireAuth, function(req, res, next){
  var newUser = new user(req.body);
  var hashedPassword = newUser.generateHash(newUser.password);
  user.create({
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
  res.render('users/edit', {
    title: 'Edit user',
    activeUser: req.user,
    username: req.user ? req.user.username : ''
  })
});

module.exports = router;
