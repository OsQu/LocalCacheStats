var winston = require("winston");
var db = require("../models");

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

function listEvents() {
  return db.event.findAll()
}

module.exports = {
  draw: function(app) {
    app.get("/event", function(req, res) {
      listEvents().then(function(events) {
        res.status(200).json(events);
      })
    });

    app.post("/event", function(req, res) {
      createEvent(req.body).then(function(event) {
        res.status(201).json(event);
      }, function(error) {
        winston.error("Unexpected error when saving event to database: %s", error);
        res.status(500).json({message: "Unknown error"});
      });
    });
  }
};
