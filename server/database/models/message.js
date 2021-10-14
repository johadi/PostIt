export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Message body can\' be empty'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'userId can\'t be empty'
        },
        isInt: {
          msg: 'userId must be a number'
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
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'normal',
      validate: {
        isIn: {
          args: [['normal', 'urgent', 'critical']],
          msg: 'priority must be normal, urgent or critical'
        }
      }
    },
    readersId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
  }, {});

  Message.associate = (models) => {
    Message.belongsTo(models.User,
        { foreignKey: 'userId', onDelete: 'CASCADE' });
    Message.belongsTo(models.Group,
        { foreignKey: 'groupId', onDelete: 'CASCADE' });
  }

  return Message;
};
