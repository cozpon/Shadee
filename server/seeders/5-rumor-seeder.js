'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('rumors', [
      {
        body: 'lied about being sick to get out of going out last week.',
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'does not know how to make a grilled cheese sandwich.',
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'said they have been to South America, when really they just drove down to Tijuana for like a weekend once.',
        points: 0,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'stole a bunch of tea bags from Vic.',
        points: 0,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: `uses the phrase 'cool beans'.`,
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: `doesn't like Disney World.`,
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'dropped their new iPhone X in the toilet.',
        points: 0,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: `doens't even tie their shoes the right way.`,
        points: 0,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'is engaged to Kylie Jenner.',
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'is about to drop a new album.',
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: `dropped part of their banana on the floor and didn't pick it up.`,
        points: 0,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'takes one bite out of communal cookies; leaves the desecrated cookie behind as a warning.',
        points: 0,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: `thinks lavender is spelled 'lavendar.'`,
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: `doesn't know the difference between it's and its.`,
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'got a sick new haircut.',
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'knows Steve Jobs.',
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'has a chatbot girlfriend.',
        points: 0,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'forgot to close the chohort door before they went home for the night.',
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'is going to be on Teen Mom.',
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'was arrested for sticking DevLeague stickers on the wall of the Safeway bathroom.',
        points: 0,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'fell asleep in the break room.',
        points: 0,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: `didn't pay Ricky back for pizza night.`,
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'loves Twilight.',
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'has a really nice Nike collection at home.',
        points: 0,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'hates the color pink.',
        points: 0,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'got a nose job.',
        points: 0,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('rumors', null, {});

  }
};

