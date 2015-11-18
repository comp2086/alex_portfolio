var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/user')

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    // Use req object for flash
    passReqToCallback: true
  },
  function(req, username, passsword, done) {


    process.nextTick(function() {
        User.findOne({
          'username': username
        },
        function(err, user) {

          // Error
          if(err) {
            return done(err);
          }

          // No user found
          if(!user) {
            return done(null, false, req.flash('loginMessage', 'Incorrect username'));
          }

          // Incorrect password
          if(!user.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Incorrect password'));
          }

          // Log in
          return done(null, user);

        }) // End of findOne
      }); // End of process
  }));
}
