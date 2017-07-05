
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    creator_id: { type: DataTypes.NUMBER, allowNull: false }
  });
  Group.associate = (models) => {
    Group.belongsToMany(models.User, { through: 'UserGroup' });
    Group.hasMany(models.Message);
  };
  return Group;
};
