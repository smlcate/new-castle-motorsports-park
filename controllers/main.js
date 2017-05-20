require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var crypto = require('crypto');
// var bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(expressJWT({ secret: 's383838' }));


exports.getEvents = function(req, res, next) {

  knex('events')
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
  })


}

exports.getEventByDate = function(req, res, next) {

  // console.log(req.body.date);

  knex('events')
  .select('*')
  .where({'date':req.body.date})
  .then(function(data) {
    console.log(data)
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
  })

}
