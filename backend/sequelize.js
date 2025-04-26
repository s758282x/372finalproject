// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres.eeatmwmiruleeolotiqn', 'password', {
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 6543,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});

module.exports = sequelize;
