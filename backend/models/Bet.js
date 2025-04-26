const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Bet = sequelize.define('Bet', {
  bet_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: DataTypes.INTEGER,
  bet_type: DataTypes.TEXT,
  amount: DataTypes.INTEGER,
  spin_result: DataTypes.TEXT,
  created_at: DataTypes.DATE,
}, {
  tableName: 'bets',
  timestamps: false,
});

module.exports = Bet;
