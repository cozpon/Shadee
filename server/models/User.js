module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    points: {type: DataTypes.INTEGER, defaultValue: 0},
    emoji_id: {type: DataTypes.INTEGER, allowNull: false},
    status_id: {type: DataTypes.INTEGER, defaultValue: 1},
    deletedAt: {type: DataTypes.DATEONLY, defaultValue: null},
    role_id: {type: DataTypes.INTEGER, defaultValue: 1}
  }, {
    tableName: 'users'
  });

  User.associate = function (models) {
    User.belongsTo(models.emoji, {
      foreignKey: 'emoji_id',
      as: 'icon'
    });
    User.belongsTo(models.status, {
      foreignKey: 'status_id',
      as: 'user_status'
    });
    User.hasMany(models.message, {
      foreignKey: 'shader_id',
      as: 'offense'
    });
    User.hasMany(models.message, {
      foreignKey: 'victim_id',
      as: 'defense'
    });
    User.belongsTo(models.role, {
      foreignKey: 'role_id',
      as: 'role'
    });
  }

  return User
}