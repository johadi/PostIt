export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    groupId: { type: DataTypes.TEXT, allowNull: false },
    priority: { type: DataTypes.STRING, defaultValue: 'normal' },
    readersId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
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
