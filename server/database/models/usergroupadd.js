export default (sequelize, DataTypes) => {
  const UserGroupAdd = sequelize.define('UserGroupAdd', {
    addedById: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addedToId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
