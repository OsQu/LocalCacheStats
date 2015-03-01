var winston = require("winston");
var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  winston.info("Processing %s %s from %s", req.method, req.path, req.ip);
  winston.info("Parameters:", req.body);
  next();
});


var db = require("./models");

var PORT = process.env.PORT || 3000;

app.post("/event", function(req, res) {
  db.sequelize.query("SELECT * FROM events;");
  res.send("Hello world");
});

var server = app.listen(PORT, function() {
  var addressInfo = server.address();
  winston.info("Started server: %s:%s", addressInfo.address, addressInfo.port);
});
