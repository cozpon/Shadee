'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('emojis', [
      {
        emoji: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAac5k2OGFCXWJdvNLZa-ET3lVGbsfxpxuDbiQJ5PkLy19gRxz'
      },
      {
        emoji: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFLEnSe7dd990GKkNQOYVoSOJt4qCyLOEw9difaNHXmQgRoRPCw'
      },
      {
        emoji: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt3o2m3OjQdQhN_fhnR4VzWZ6tTQ4zBZjOz596uk9SNMQL8ffdFw'
      },
      {
        emoji: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ZOAlaAKOW8Gplg8ZOa8bb1ij0UPjXlD6yJ3rexOeVBPHcMFmlg'
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('emojis', null, {});

  }
};