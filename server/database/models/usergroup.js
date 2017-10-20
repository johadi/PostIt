export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        UserGroup.belongsTo(models.Group, { foreignKey: 'groupId' });
        UserGroup.belongsTo(models.User, { foreignKey: 'userId' });
      }
    },
    timestamps: false
  });
  return UserGroup;
};

