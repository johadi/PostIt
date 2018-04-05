export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A group with this name already exists'
      }
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'creatorId can\'t be empty'
        },
        isInt: {
          msg: 'creatorId can only be a number'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Group.belongsToMany(models.User,
          { through: 'UserGroup', foreignKey: 'groupId' });
        Group.hasMany(models.Message, { foreignKey: 'groupId' });
      }
    }
  });
  return Group;
};
