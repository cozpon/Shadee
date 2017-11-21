module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('role', {
    role: {type: DataTypes.STRING}
  }, {
    tableName: 'roles',
    timestamps: false
  });

  return Role;
}