export default (sequelize, DataTypes) => {
  const UserGroupAdd = sequelize.define('UserGroupAdd', {
    addedById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'addedById can\'t be empty'
        },
        isInt: {
          msg: 'addedById must be a number'
        }
      }
    },
    addedToId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'addedToId can\'t be empty'
        },
        isInt: {
          msg: 'addedToId must be a number'
        }
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'groupId can\'t be empty'
        },
        isInt: {
          msg: 'groupId must be a number'
        }
      }
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return UserGroupAdd;
};
