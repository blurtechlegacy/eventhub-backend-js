const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const User = require('../models/user');
const Tag = require('../models/tag')

router.route('/')
	.post(function(req, res) {
		let event = new Event();
		event.name = req.body.name;
		event.host = req.body.host;
		event.host_name = req.body.host_name;
		event.description = req.body.description;
		event.place = req.body.place;
		event.start = req.body.start;
		event.end = req.body.end;

		temp_tags = req.body.tags;
		event.tags = [];
		temp_tags.forEach(function(tag_id) {
			Tag.findById(tag_id, function(err, tag) {
				if (err)
					res.status(500).send(err);
				tag.event_count++;
				event.tags.append(tag.name);
			})
		});
		tag.save(function(err) {
			if (err)
				res.status(500).send(err);
		});
		event.save(function(err) {
			if (err)
				res.status(500).send(err);
			res.status(200).json({ message: 'Event created!' });
		});
	})
	.get(function(req, res) {
	 	Event.find(function(err, events) {
	 		if (err)
	 			res.status(500).send(err);
	 		res.status(200).json(events);
	 	});
	});
router.route('/:event_id')
	.get(function(req, res) {
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
				res.status(500).send(err);
			res.status(200).json(event);
		});
	})
	.put(function(req, res) {
		Event.findById(req.params.event_id, function(err, event) {
			if (err)
				res.status(500).send(err);
			old_tag_array = event.tags;
			event.name = req.body.name;
			event.host = req.body.host;
			event.host_name = req.body.host_name;
			event.description = req.body.description;
			event.place = req.body.place;
			event.tags = req.body.tags;
			event.start = req.body.start;
			event.end = req.body.end;

			let temp_tag_array = req.body.tags;
			temp_tag_array.forEach(function(tag_id) {
				Tag.findById(tag_id, function(err, tag) {
					if (err)
						res.status(500).send(err);
					tag.event_count++;
					event.tags.append(tag.name);
				})
			});
		})
		if (temp_tag_array !== old_tag_array) {
			old_tag_array.forEach(function(old_tag) {
				if (temp_tag_array.includes(old_tag)) {
					let index = temp_tag_array.indexOf(old_tag);
					temp_tag_array.splice(index, 1);
				}
			})
			temp_tag_array.forEach(function(new_tag) {
				Tag.findById(new_tag, function(err, tag) {
					if (err)
						res.status(500).send(err);
					tag.event_count++;
				})
			})
		}
		tag.save(function(err) {
			if (err)
				res.status(500).send(err);
		});
		event.save(function(err) {
			if (err)
				res.status(500).send(err);
			res.status(200).json({ message: 'Event updated!' });
		})
	})
	.delete(function(req, res) {
		Event.remove({
			_id: req.params.event_id
		}, function(err, event) {
			if (err)
				res.status(500).send(err);
			res.status(200).json({ message: 'Successfully deleted' });
		});
	});
router.route('/assign').post(function(req, res) {
	Event.findById(req.body.event_id, function(err, event) {
		if (err)
			res.status(500).send(err);
		User.findById(req.body.user_id, function(err, user) {
			if (err)
				res.status(500).send(err);
			if (!(event.guests.includes(user.id))) {
				event.guests.push(user.id);
				res.status(200).json({ message: 'User assigned to event' });
			}
			else res.status(200).json({ message: 'User is already assigned to this event' })
		})
	})
})
router.route('/search/:searchkey').get(function(req, res) {
	Event.find({ $or:[
		{ name: { $regex: req.params.searchkey, $options: 'i' } },
		{ tags: { $regex: req.params.searchkey, $options: 'i' } },
		{ description: { $regex: req.params.searchkey, $options: 'i' } }
	]}, function(err, result) {
		if (err)
			res.status(500).send(err);
		else res.status(200).json({ events: result });
	})
})
module.exports = router;