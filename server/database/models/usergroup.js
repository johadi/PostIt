// Pivot table for User and Group models
export default (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: 'userId must be a number'
                    }
                }
            },
            groupId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: 'groupId must be a number'
                    }
                }
            },
        },
        {
            timestamps: false
        });

    UserGroup.associate = (models) => {
        UserGroup.belongsTo(models.Group,
            {foreignKey: 'groupId', onDelete: 'CASCADE'});
        UserGroup.belongsTo(models.User,
            {foreignKey: 'userId', onDelete: 'CASCADE'});
    }
    return UserGroup;
};

