module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'password_resets', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.Sequelize.STRING,
        },
        token: {
          unique: true,
          type: Sequelize.Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.Sequelize.DATE,
        },
        expires_at: {
          allowNull: false,
          type: Sequelize.Sequelize.DATE,
        },
      }, {
        underscored: true,
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('password_resets');
  },
};
