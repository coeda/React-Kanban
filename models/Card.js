module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
    title: {
      type: DataTypes.STRING
    },

    priority: {
      type: DataTypes.INTEGER
    },

    status: {
      type: DataTypes.STRING
    },
    assignedTo: {
      type: DataTypes.STRING
    },
    createdBy: {
      type: DataTypes.STRING
    }

  }, {
    classMethods: {
      // associate: function(models) {
      //   Card.belongsTo(models.User);
      // }
    }
  });

  return Card;
};