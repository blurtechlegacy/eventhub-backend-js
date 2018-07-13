const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');

router.route('/')
	.post(function(req, res) {
		let tag = new Tag();
		tag.name = req.body.name;
		tag.save(function(err) {
			if (err)
				res.status(500).send(err);
			res.status(200).json({ message: 'Tag created!' });
		});
	})
	.get(function(req, res) {
	 	Tag.find(function(err, tags) {
	 		if (err)
	 			res.status(500).send(err);
	 		res.status(200).json(tags);
	 	});
	});
router.route('/:tag_id')
	.get(function(req, res) {
		Tag.findById(req.params.tag_id, function(err, tag) {
			if (err)
				res.status(500).send(err);
			res.status(200).json(tag);
		});
	})
	.put(function(req, res) {
		Tag.findById(req.params.tag_id, function(err, tag) {
			if (err)
				res.status(500).send(err);
			tag.name = req.body.name;
			tag.save(function(err) {
				if (err)
					res.status(500).send(err);
				res.status(200).json({ message: 'Tag updated!' });
			});
		});
	})
	.delete(function(req, res) {
		Tag.remove({
			_id: req.params.tag_id
		}, function(err, tag) {
			if (err)
				res.status(500).send(err);
			res.status(200).json({ message: 'Successfully deleted' });
		});
	});
module.exports = router;