var random = require('geojson-random');
var express = require('express');
var app = express();

//sqlite3 is just a pain
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('fish.db');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 

var path = require('path');

//geojson for the map
app.get('/', function (req, res) {
  db.each("SELECT rowid AS id, name FROM fish", function(err, row) {
  	  console.log(name)
      console.log(row.name + ": " + row.name);
  });
  //res.send(random.point(20));  ---  random points
  res.sendFile(path.join(__dirname + '/test.json'));
});

//map route
app.get('/map', function (req, res) {
  res.sendFile(path.join(__dirname + '/map.html'));
});

//form route
app.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname + '/form.html'));
});

//receive form data
app.post('/form', function(req, res, next) {
  var name = req.body.name;
  var dis = req.body.dis;
  var lat = req.body.lat;
  var long = req.body.long;
  console.log(name)
  console.log(lat)
  //bug - says that there is no such collum as any of these
  var stmt = db.prepare("INSERT INTO fish VALUES (name, dis, lat, long)");

  stmt.finalize();
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});