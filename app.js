var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var router = express.Router();
var port = process.env.PORT || 1984;
var routes = require('./app/routes');

mongoose.connect('mongodb://<ip>:27017/event-sharing', {useNewUrlParser: true})

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v001', routes);

app.listen(port);
console.log('Server is listening on port ' + port);
