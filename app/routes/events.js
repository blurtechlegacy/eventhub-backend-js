var express = require('express');
var router = express.Router();
var Event = require('../models/event');

router.route('/')
	.post(function(req, res) {
		var event = new Event();
		event.name = req.body.name;
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
			event.name = req.body.name;
			event.save(function(err) {
				if (err)
					res.status(500).send(err);
				res.status(200).json({ message: 'Event updated!' });
			});
		});
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
module.exports = router;