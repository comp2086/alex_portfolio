/*
File name: facebook.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: facebook OAuth strategy
*/

//NOTE: this is not done yet, hence, it is not working properly. You can actually Login
//with facebook and it saves a new user if validation parameters are commented out in the user.js model.
//but the redirection(index.js) is broken for some reason
//and User is not being inserted correctly into the DB(all fields are blank)
//(i think, empty user fields in the DB are the reason of malfunctioning)
var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('mongoose').model('User'),
    DB = require('../db.js');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: DB.facebook.clientID,
    clientSecret: DB.facebook.clientSecret,
    callbackURL: DB.facebook.callbackURL,
    passReqToCallback: true
  },

  function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    var newUser = new User();
    newUser.firstname = profile.name.givenName.value;
    newUser.lastname = profile.name.familyName.value;
    newUser.email = profile.email.value;
    newUser.username = profile.username.value;
    newUser.provider = 'facebook';
    newUser.providerId = profile.id;
    newUser.providerData = providerData;

    process.nextTick(function() {
      newUser.save(function(err) {
        if(err) {
          return done(err);
        }

        // Log in
        return done(null, newUser);
      });
    });
  }));
};
