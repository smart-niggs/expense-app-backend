'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    value: DataTypes.INTEGER,
    reason: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    vat: DataTypes.INTEGER
  }, {});
  Expense.associate = function(models) {
    // associations can be defined here
    Expense.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  };
  return Expense;
};