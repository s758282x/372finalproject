const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  balance: DataTypes.DECIMAL, 
  username: DataTypes.TEXT,
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
