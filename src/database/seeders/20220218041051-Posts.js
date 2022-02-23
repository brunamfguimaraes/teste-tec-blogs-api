module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Posts',
      [
        {
          id: 77062736534553,
          title: "Latest updates, August 1st",
          content: "The whole text for the blog post goes here in this key",
          userId: 401465483996,
          published: new Date("2011-08-01T19:58:00.000Z"),
          updated: new Date("2011-08-01T19:58:51.947Z"),
        }
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
