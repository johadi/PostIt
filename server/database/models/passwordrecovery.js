export default (sequelize, DataTypes) => {
  const PasswordRecovery = sequelize.define('PasswordRecovery', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'This email is invalid'
        },
        max: {
          args: 254,
          msg: 'This email seems invalid because is longer than 254 characters'
        }
      }
    },
    hashed: {
      type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return PasswordRecovery;
};
