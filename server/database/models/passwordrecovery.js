export default (sequelize, DataTypes) => {
  const PasswordRecovery = sequelize.define('PasswordRecovery', {
    email: DataTypes.STRING,
    hashed: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return PasswordRecovery;
};
