export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    creatorId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    classMethods: {
      associate: (models) => {
        Group.belongsToMany(models.User, { through: 'UserGroup', foreignKey: 'groupId' });
        Group.hasMany(models.Message, { foreignKey: 'groupId' });
      }
    }
  });
  return Group;
};
