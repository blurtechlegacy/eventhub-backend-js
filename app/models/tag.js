const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	event_count: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Tag', TagSchema);