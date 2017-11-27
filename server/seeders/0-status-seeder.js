'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('statuses', [
      {
        name: 'Basic'
      },
      {
        name: 'Extra'
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('statuses', null, {});

  }
};