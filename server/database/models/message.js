
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: { type: DataTypes.TEXT, allowNull: false }
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User, { foreignKey: 'userId' });
        Message.belongsTo(models.Group, { foreignKey: 'groupId' });
      }
    }
  });
  return Message;
};
