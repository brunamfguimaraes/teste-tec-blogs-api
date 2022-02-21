module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts',
      [
        {
          id: 7706273476706534553,
          title: "Latest updates, August 1st",
          content: "The whole text for the blog post goes here in this key",
          userId: 401465483996,
          published: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
