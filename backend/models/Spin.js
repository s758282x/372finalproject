const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Spin = sequelize.define('Spin', {
  spin_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  result: DataTypes.TEXT,
  created_at: DataTypes.DATE,
}, {
  tableName: 'spins',
  timestamps: false,
});

module.exports = Spin;
