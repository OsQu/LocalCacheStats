var winston = require("winston");
var express = require('express');
var bodyParser = require("body-parser");

var env = require("./app_env");

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  winston.info("Processing %s %s from %s", req.method, req.path, req.ip);
  winston.info("Parameters:", req.body);
  next();
});

winston.level = process.env.LOG_LEVEL || "info";

if(env === "production") {
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.DailyRotateFile, {
    level: "info",
    filename: "log/app.log",
    json: false
  });
}

require("./routes/event").draw(app);

var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function() {
  var addressInfo = server.address();
  winston.info("Started server: %s:%s", addressInfo.address, addressInfo.port);
});
