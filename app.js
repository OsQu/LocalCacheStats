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

function createEvent(params) {
  return db.event.create({
    device_name: params.device.name,
    device_id: params.device.id,
    duration: params.duration,
    connection: params.connection,
    file: params.file,
    host: params.host,
    size: params.size,
    meta: params.meta,
    signal: params.signal
  });
}

app.post("/event", function(req, res) {
  createEvent(req.body).then(function(event) {
    res.status(201).json(event);
  }, function(error) {
    winston.error("Unexpected error when saving event to database: %s", error);
    res.status(500).json({message: "Unknown error"});
  });
});

var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function() {
  var addressInfo = server.address();
  winston.info("Started server: %s:%s", addressInfo.address, addressInfo.port);
});
