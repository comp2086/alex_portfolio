var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {

  // Session serialization and deserialization

  // Require local strategy
  require('./strategies/local.js');
}
