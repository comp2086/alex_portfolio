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

// Users index page
router.get('/', requireAuth, function (req, res, next) {
  User.find(function (err, users) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('users/index', {
        title: 'Users',
        activeUser: req.user,
        usersCollection: users,
        username: req.user ? req.user.username : ''
      });
    }
  });
});

// Delete user page
router.get('/delete/:id', requireAuth, function (req, res, next) {
  var id = req.params.id;
  User.remove({ _id: id }, function (err) {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/users');
    }
  });
});

module.exports = router;
