var express = require('express');
var app = express();
var winston = require("winston");

var db = require("./db");

var PORT = process.env.PORT || 3000;

app.post("/event", function(req, res) {
  db.query("SELECT * FROM events;");
  res.send("Hello world");
});

var server = app.listen(PORT, function() {
  var addressInfo = server.address();
  winston.info("Started server: %s:%s", addressInfo.address, addressInfo.port);
});
