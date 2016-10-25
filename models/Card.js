module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
    title: {
      type: DataTypes.STRING
    },

    priority: {
      type: DataTypes.STRING
    },

    status: {
      type: DataTypes.STRING,
    },

  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.User);
      }
    }
  });

  return Card;
};