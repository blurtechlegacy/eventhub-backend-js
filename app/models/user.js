const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	login: String,
	password: String,
	name: String,
	birthday: String,
	sex: Number
});

module.exports = mongoose.model('User', UserSchema);