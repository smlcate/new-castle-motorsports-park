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

var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

exports.updatePoints = function(req, res, next) {

  // console.log(req.body);

  var date = new Date();

  knex('pointsList')
  .insert({
    date:date,
    pointsData:req.body
  })
  .catch(function(err) {
    console.log(err);
  })

  res.send('success')

}

exports.getPoints = function(req, res, next) {

  knex('pointsList')
  .select('*')
  .then(function(data) {
    var length = data.length;
    // console.log('DATA FROM POINTS LIST', data);
    var l = data;
    // l.pointsData = JSON.parse(l.pointsData)
    res.send(l);

  })
  .catch(function(err) {
    console.log(err);
  })

}


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

exports.getSeries = function(req, res, next) {

  knex('event_group')
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data);
  })

}

exports.submitEvent = function(req, res, next) {

  // console.log(req.body.input.startDate.slice(6,-15))

  var series_id;

  function getData(id) {

    knex('event_group')
    .select('*')
    .where({name:req.body[0].name})
    .then(function(data) {
      console.log('Data: -------------->    ', data);

      series_id = data.id

      eventParser(data);



    })
    .catch(function(err) {
      console.log(err);
    })
  }
  function eventParser(data) {

    console.log(data[0].id);

    for (var i = 0; i < req.body.length; i++) {

      // console.log(req.body[i]);

      console.log(req.body)

      // var seriesId;

      if (req.body[i].selectedSeriesInfo) {
        seriesId = req.body[i].id
      } else {

      }

      var date = req.body[i].startDate;

      var newMonth = false;



      var x = 0;


      var m = Number(date.slice(5,-17))
      var n = Number(date.slice(8,-14));
      var h1 = date.slice(0,8);
      var h2 = date.slice(10);

      var y = h1.slice(0,-2)

      // console.log(y)

      for (var j = 0; j < req.body[i].length+1; j++) {

        // console.log()
        var event = {
          date:date,
          name:req.body[i].name,
          description:req.body[i].description,
          color:req.body[i].color,
          series_id:null,
          start_time: null,
          end_time: null
        }

        console.log(req.body[i].start_time)

        if (req.body[i].start_time) {
          event.start_time = req.body[i].start_time.slice(11,-1);
        }

        if (req.body[i].end_time) {
          event.end_time = req.body[i].end_time.slice(11,-1);
        }

        event.series_id = data[0].id;

        console.log(event)



        if (n + j > monthDays[m-1] && newMonth === false) {
          newMonth = true;
          x = j;
          m++;

        }

        // console.log(m)


        if (newMonth === true) {

          n = (j - x) + 1;

          event.date = y + m + '-' + n + h2;

        } else {

          event.date = y + m + '-' + (n + j) + h2;
          console.log(event.date)
          // console.log(event.date)

        }




        console.log(n)

        console.log(h1)
        console.log(h2)
        console.log(event.date);

        knex('events')
        .insert(event)
        .then(function() {
          return knex('events')
          .select('*')
          .then(function(data) {
            // console.log(data)
          })
          .catch(function(err) {
            console.log(err)
          })
        })
        .catch(function(err){
          console.log(err);
        })

      }


      // console.log(req.body)

    }
  }

  if (req.body[0].newSeries === true) {

    console.log('hit 1')

    knex('event_group')
    .insert({name:req.body[0].name})
    .then(function(data) {
      getData(series_id);
    })





  } else if(req.body[0].selectedSeriesInfo) {

    console.log('series id: ' + req.body[0].selectedSeriesInfo.id)

    for (var i = 0; i < req.body.length; i++) {

      // console.log(req.body[i]);

      console.log(req.body)

      // var seriesId;

      if (req.body[i].selectedSeriesInfo) {
        seriesId = req.body[i].id
      } else {

      }

      var date = req.body[i].startDate;

      var newMonth = false;



      var x = 0;


      var m = Number(date.slice(5,-17))
      var n = Number(date.slice(8,-14));
      var h1 = date.slice(0,8);
      var h2 = date.slice(10);

      var y = h1.slice(0,-2)

      // console.log(y)

      for (var j = 0; j < req.body[i].length+1; j++) {

        // console.log()
        var event = {
          date:date,
          name:req.body[i].name,
          description:req.body[i].description,
          color:req.body[i].color,
          series_id:req.body[0].selectedSeriesInfo.id,
          start_time: req.body[0].start_time,
          end_time: req.body[0].end_time
        }

        console.log(event)

        if (series_id !== null) {
          event.series_id = series_id;
        }


        if (n + j > monthDays[m-1] && newMonth === false) {
          newMonth = true;
          x = j;
          m++;

        }

        // console.log(m)


        if (newMonth === true) {

          n = (j - x) + 1;

          event.date = y + m + '-' + n + h2;

        } else {

          event.date = y + m + '-' + (n + j) + h2;
          console.log(event.date)
          // console.log(event.date)

        }




        console.log(n)

        console.log(h1)
        console.log(h2)
        console.log(event.date);

        knex('events')
        .insert(event)
        .then(function() {
          return knex('events')
          .select('*')
          .then(function(data) {
            // console.log(data)
          })
          .catch(function(err) {
            console.log(err)
          })
        })
        .catch(function(err){
          console.log(err);
        })

      }


      // console.log(req.body)

    }


  } else {


    for (var i = 0; i < req.body.length; i++) {

      // console.log(req.body[i]);

      console.log(req.body)

      // var seriesId;

      if (req.body[i].selectedSeriesInfo) {
        seriesId = req.body[i].id
      } else {

      }

      var date = req.body[i].startDate;

      var newMonth = false;



      var x = 0;


      var m = Number(date.slice(5,-17))
      var n = Number(date.slice(8,-14));
      var h1 = date.slice(0,8);
      var h2 = date.slice(10);

      var y = h1.slice(0,-2)

      // console.log(y)

      for (var j = 0; j < req.body[i].length+1; j++) {

        // console.log()
        var event = {
          date:date,
          name:req.body[i].name,
          description:req.body[i].description,
          color:req.body[i].color,
          series_id:req.body[0].seriesId,
          start_time: req.body[0].start_time,
          end_time: req.body[0].end_time

        }

        console.log(event)
        //
        // if (series_id !== null) {
        //   event.series_id = series_id;
        // }


        if (n + j > monthDays[m-1] && newMonth === false) {
          newMonth = true;
          x = j;
          m++;

        }

        // console.log(m)


        if (newMonth === true) {

          n = (j - x) + 1;

          event.date = y + m + '-' + n + h2;

        } else {

          event.date = y + m + '-' + (n + j) + h2;
          console.log(event.date)
          // console.log(event.date)

        }




        console.log(n)

        console.log(h1)
        console.log(h2)
        console.log(event.date);

        knex('events')
        .insert(event)
        .then(function() {
          return knex('events')
          .select('*')
          .then(function(data) {
            // console.log(data)
          })
          .catch(function(err) {
            console.log(err)
          })
        })
        .catch(function(err){
          console.log(err);
        })

      }


      // console.log(req.body)

    }

  }

  // if (req.body[0].newSeries === true) {
  //
  //   console.log('hit 2')
  //
    // knex('event_group')
    // .select('*')
    // .where({name:req.body[0].name})
    // .then(function(data) {
    //   console.log('Data: -------------->    ', data);
    //   series_id = data.id
    // })
    // .catch(function(err) {
    //   console.log(err);
    // })
  //
  // }




  res.send(req.body);



}
