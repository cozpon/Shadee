'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('roles', [
      {
        role: 'user'
      },
      {
        role: 'admin'
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('roles', null, {});

  }
};

