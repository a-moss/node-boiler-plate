import faker from 'faker';

module.exports = {
  up: async (queryInterface) => {
    const seedData = [];
    [...Array(Math.floor(Math.random() * 100)).keys()].forEach((_) => {
      seedData.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    await queryInterface.bulkInsert('users', seedData);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      'users', null, {},
    );
  },
};
