const { Sequelize } = require('sequelize');

// fallback values for local dev (optional, but good for now)
const dbName = process.env.DB_NAME || 'postgres';
const dbUser = process.env.DB_USER || 'postgres.eeatmwmiruleeolotiqn';
const dbPassword = process.env.DB_PASSWORD || 'your-real-password';
const dbHost = process.env.DB_HOST || 'aws-0-us-east-1.pooler.supabase.com';
const dbPort = process.env.DB_PORT || 6543; // default postgres port

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = sequelize;
