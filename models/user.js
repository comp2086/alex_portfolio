/*
File name: user.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: users collection schema
*/

var mongoose = require('mongoose'),
		bcrypt = require('bcrypt-nodejs'),
		Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstname: String,
	lastname: String,
	username: {
		type: String,
		unique: true,
		//required: "Username is required",
		trim: true
	},

	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please enter a valid email address"]
	},

	password: {
		type: String,
		//validate: [
			//function(password) { return password && password.length > 6; },
		//					"Password should be 6 characters or longer"
	//	]
	},

	salt: String,
	provider: String,
	providerId: String,
	providerData: {},

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
		type: Number,
		default: Date.now
	}
},
{
	collection: 'userInfo'
});

// Generate hash
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check password
UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);
