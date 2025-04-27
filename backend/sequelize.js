// sequelize.js
const { Sequelize } = require('sequelize');

// Create the Sequelize instance
const sequelize = new Sequelize(
  'postgres', // database name
  'postgres.eeatmwmiruleeolotiqn', // username
  'password', // your real password
  {
    host: 'aws-0-us-east-1.pooler.supabase.com', // pooled Supabase host
    port: 6543, // pooled Supabase port
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log, // optional: shows SQL queries and connection logs
  }
);

// ✅ Test connection immediately on server boot
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = sequelize;
