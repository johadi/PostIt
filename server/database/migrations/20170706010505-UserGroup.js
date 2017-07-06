

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserGroups', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserGroup');
  }
};
