module.exports = function (sequelize, DataTypes) {

  const Rumor = sequelize.define('rumor', {
    body: {type: DataTypes.STRING},
    points: {type: DataTypes.INTEGER, defaultValue: 0},
    user_id: {type: DataTypes.INTEGER, allowNull: true}
  }, {
    tableName: 'rumors'
  });

  Rumor.associate = function (models) {
    Rumor.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user'
    });
  }

  return Rumor;
}