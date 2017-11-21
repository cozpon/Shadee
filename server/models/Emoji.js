module.exports = function (sequelize, DataTypes) {
  const Emoji = sequelize.define('emoji', {
    emoji: {type: DataTypes.STRING}
  }, {
    tableName: 'emojis',
    timestamps: false
  });

  return Emoji;
}