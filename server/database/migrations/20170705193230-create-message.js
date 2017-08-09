
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      priority: {
        type: Sequelize.STRING,
        defaultValue: 'normal'
      },
      readersId: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Messages',
        { force: true, cascade: false });
  }
};
