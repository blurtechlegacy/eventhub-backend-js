const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
		host: String,
		host_name: String,
		name: String,
		description: String,
		place: String,
		tags: [String],
		guests: [String],
		start: String,
		end: String
});

module.exports = mongoose.model('Event', EventSchema);