export default (sequelize, DataTypes) => {
  const PasswordRecovery = sequelize.define('PasswordRecovery', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email can\'t be empty'
        },
        isEmail: {
          msg: 'This email is invalid'
        }
      }
    },
    hashed: {
      type: DataTypes.STRING,
    }
  });
  return PasswordRecovery;
};
