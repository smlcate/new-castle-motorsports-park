require('dotenv').config();

var pg = require('pg');

var express = require('express');
var app = express();
var knex = require('./db/knex');
var bodyParser = require('body-parser');
var server = require('./controllers/main.js')

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/getEvents', server.getEvents);
app.post('/getEventByDate', server.getEventByDate);

app.get('/getSeries', server.getSeries);

app.post('/submitEvent', server.submitEvent);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
