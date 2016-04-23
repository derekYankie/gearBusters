var random = require('geojson-random');
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('fish.db');


db.close();

var path = require('path');

app.get('/', function (req, res) {
  //res.send(random.point(20));
  res.sendFile(path.join(__dirname + '/test.json'));
});

app.get('/map', function (req, res) {
  res.sendFile(path.join(__dirname + '/map.html'));
});

app.post('/map', function(req, res, next) {
  name = req.body.name;
  dis = req.body.dis;
  lat = req.body.lat;
  long = req.body.long;
  console.log(lat)
  console.log(long)
  sqlRequest = "INSERT INTO 'fish' (name, dis,lat, long)"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      next(err);
    }
    else {
      res.redirect('back');
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});