var Sequelize = require("sequelize");

var DB_USER = process.env.DB_USER;
var DB_PWD = process.env.DB_PWD;

if(!DB_USER) {
  throw new Error("DB_USER environment variable is not set");
}

var db = new Sequelize('local_cache_stats', DB_USER, DB_PWD, {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = db;
