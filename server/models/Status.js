module.exports = function (sequelize, DataTypes) {
  const Status = sequelize.define('status', {
    name: {type: DataTypes.STRING}
  }, {
    tableName: 'statuses',
    timestamps: false
  });

  return Status;
}