const bcrypt = require('bcrypt-nodejs');

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
      },
      signupRules: () => ({
        password: 'required|min:6',
        confirmPassword: 'required|min:6',
        username: 'required',
        email: 'required|email',
        fullname: 'required'
      }),
      loginRules: () => ({
        password: 'required|min:6',
        username: 'required',
      })
    },
    instanceMethods: {
      comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash;
      }
    }
  });
  return User;
};
