var Promise = require('bluebird');
var db = require("../models/index.js");

module.exports = function(req, res) {
  json = {
    "HS": {},
    "cache": {},
  }

  Promise.all([
    avg("HS", json),
    numberOfReports("HS", json),
    numberOfFiles("HS", json),
    averageFileSize("HS", json),

    avg("cache", json),
    numberOfReports("cache", json),
    numberOfFiles("cache", json),
    averageFileSize("cache", json)
  ]).then(function() {
    res.status(200).json(json);
  });
}

function avg(host, json) {
  return db.sequelize.query('select avg(avg) from (select avg(duration) from events where host = ? and "createdAt" >= current_date group by device_id) as avgDuration',
    { replacements: [host], type: db.sequelize.QueryTypes.SELECT }
  ).then(function(response) {
    json[host]["average_duration"] = response[0]["avg"];
  });
}

function numberOfReports(host, json) {
  return db.sequelize.query('select avg(count) from (select count(*) from events where host = ? and "createdAt" >= current_date group by device_id) as countOfReports',
    { replacements: [host], type: db.sequelize.QueryTypes.SELECT }
  ).then(function(response) {
    json[host]["average_reports"] = response[0]["avg"];
  });
}

function numberOfFiles(host, json) {
  return db.sequelize.query('select avg(count) from (select count(file) from events where host = ? and "createdAt" >= current_date group by device_id) as countOfFiles',
    { replacements: [host], type: db.sequelize.QueryTypes.SELECT }
  ).then(function(response) {
    json[host]["average_file_count"] = response[0]["avg"];
  });
}

function averageFileSize(host, json) {
  return db.sequelize.query('select avg(avg) from (select avg(size) from events where host = ? and "createdAt" >= current_date group by device_id) as averageFileSize',
    { replacements: [host], type: db.sequelize.QueryTypes.SELECT }
  ).then(function(response) {
    json[host]["average_file_size"] = response[0]["avg"];
  });
}
