module.exports = function (sequelize, DataTypes) {

  const Message = sequelize.define('message', {
    body: {type: DataTypes.STRING},
    points: {type: DataTypes.INTEGER, defaultValue: 0},
    media: {type: DataTypes.STRING},
    shader_id: {type: DataTypes.INTEGER, allowNull: false},
    victim_id: {type: DataTypes.INTEGER},
    status_id: {type: DataTypes.INTEGER, defaultValue: 1},
    parent_id: {type: DataTypes.INTEGER},
    deletedAt: {type: DataTypes.DATEONLY, defaultValue: null}
  }, {
    tableName: 'messages'
  });

  Message.associate = function (models) {
    Message.belongsTo(models.user, {
      foreignKey: 'shader_id',
      as: 'shader'
    });
    Message.belongsTo(models.user, {
      foreignKey: 'victim_id',
      as: 'victim'
    });
    Message.belongsTo(models.status, {
      foreignKey: 'status_id',
      as: 'message_status'
    });
    // Message.belongsTo(models.message, {
    //   foreignKey: 'parent_id',
    //   as: 'parent'
    // });
    // Message.hasMany(models.message, {
    //   foreignKey: 'parent_id',
    //   as: 'parent'
    // });
  }

  return Message;
}