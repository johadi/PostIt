
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserGroups', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('userGroups',
        { force: true, cascade: true });
  }
};
