// 'use strict';
// module.exports = {
//   up: function(queryInterface, Sequelize) {
//     return queryInterface.createTable('Users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       username: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           isAlphanumeric: true
//         }
//       },
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       emailaddress: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true
//         }
//       }
//     });
//   },
//   down: function(queryInterface, Sequelize) {
//     return queryInterface.dropTable('Users');
//   }
// };