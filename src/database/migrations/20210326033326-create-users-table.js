module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.Sequelize.STRING,
          unique: true,
        },
        password: {
          type: Sequelize.Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.Sequelize.DATE,
        },
      }, {
        underscored: true,
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
