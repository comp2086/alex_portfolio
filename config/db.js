
module.exports = {
  // Staging connection
  //'url' : 'mongodb://localhost/userDB',
  // Live connection
  'url' : 'mongodb://auth_assignment:12345@ds031651.mongolab.com:31651/userdb'

  // Facebook app session
  'facebook' : {
    clientID: '1701058573514057',
    clientSecret: 'da895a0da3862a08257a098ae36d7338',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  }
};
