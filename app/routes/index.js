const express = require('express');
const router = express.Router();
const Events = require('./events');
const Users = require('./users');
const Tags = require('./tags');

router.get('/', function(req, res) {
	res.status(200).send('OK');
});

router.use('/events', Events);
router.use('/users', Users);
router.use('/tags', Tags);

module.exports = router;