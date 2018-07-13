const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const port = process.env.PORT || 1984;
const routes = require('./app/routes');

mongoose.connect('mongodb://40.115.121.27:27017/event-sharing', {useNewUrlParser: true})

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v001', routes);

app.listen(port);
console.log('Server is listening on port ' + port);
