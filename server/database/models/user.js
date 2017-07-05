
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    mobile: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Group, { through: 'UserGroup' });
    User.hasMany(models.Message);
  };
  return User;
};
