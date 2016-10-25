'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [
      {
        title: 'Wash Car',
        priority: 'high',
        status: 'in progress',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }, {
        title: 'Wash doge',
        priority: 'high',
        status: 'in progress',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },{
        title: 'feed doge',
        priority: 'high',
        status: 'in progress',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },{
        title: 'feed cat',
        priority: 'high',
        status: 'in progress',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },{
        title: 'Wash Cat',
        priority: 'high',
        status: 'in progress',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }
    ], {});
  },


  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards',
      {
        UserId: [1]
      }, {});
  }
};
