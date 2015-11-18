var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {

  var User = mongoose.model('User');

  // User serialization and deserialization
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });

  // Require strategies
  require('./strategies/local_signin.js')();
  require('./strategies/local_signup.js')();
}
