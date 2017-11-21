'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('messages', [
      {
        body: 'This app is da bomb!!',
        points: 5,
        media: null,
        shader_id: 1,
        victim_id: 2,
        status_id: 1,
        parent_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        body: 'Czech yourself.',
        points: 8,
        media: null,
        shader_id: 2,
        victim_id: 1,
        status_id: 2,
        parent_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        body: 'Ya boring.',
        points: 100,
        media: null,
        shader_id: 3,
        victim_id: 4,
        status_id: 2,
        parent_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        body: 'backyardboiz 4 lyfe',
        points: 2000,
        media: null,
        shader_id: 4,
        victim_id: 2,
        status_id: 2,
        parent_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('messages', null, {});

  }
};

