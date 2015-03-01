var Sequelize = require("sequelize");
var fs = require("fs");
var appEnv = require("./app_env");

/*jslint stupid:true */
var dbConfig = JSON.parse(fs.readFileSync("config/config.json"))[appEnv];

var db = new Sequelize('local_cache_stats', dbConfig.username, dbConfig.password, {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = db;
