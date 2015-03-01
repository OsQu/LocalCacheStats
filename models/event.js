module.exports = function(sequelize, DataTypes) {
  return sequelize.define("event", {
    device_name: DataTypes.STRING,
    device_id: DataTypes.STRING,
    duration: DataTypes.BIGINT,
    connection: DataTypes.STRING,
    file: DataTypes.STRING,
    host: DataTypes.STRING,
    size: DataTypes.BIGINT,
    meta: DataTypes.TEXT,
    signal: DataTypes.FLOAT
  });
};
