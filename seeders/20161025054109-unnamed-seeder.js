'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [
      {
        title: 'Wash Car',
        priority: 3,
        status: 'queue',
        createdBy: 'Casey',
        assignedTo: 'Jim',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Wash doge',
        priority: 2,
        status: 'in progress',
        createdBy: 'Casey',
        assignedTo: 'Jim',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'feed doge',
        priority: 2,
        status: 'queue',
        createdBy: 'Casey',
        assignedTo: 'Jim',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'feed cat',
        priority: 3,
        status: 'in progress',
        createdBy: 'Casey',
        assignedTo: 'Jim',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Wash Cat',
        priority: 1,
        status: 'completed',
        createdBy: 'Casey',
        assignedTo: 'Jim',
        createdAt: new Date(),
        updatedAt: new Date()
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
