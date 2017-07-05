
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: { type: DataTypes.TEXT, allowNull: false }
  });
  Message.associate = (models) => {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Group);
  };
  return Message;
};
