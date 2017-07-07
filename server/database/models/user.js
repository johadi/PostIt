
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    mobile: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Group, { through: 'UserGroup', foreignKey: 'userId' });
        User.hasMany(models.Message, { foreignKey: 'userId' });
      }
    },
    instanceMethods: {
      name() {
        return this.fullname;
      },
      printEmail() {
        return `hello ${this.name()}`;
      }
    }
  });
  return User;
};
