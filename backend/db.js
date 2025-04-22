const { Pool } = require("pg");

// Replace this with your actual PostgreSQL connection string
const pool = new Pool({
  connectionString: "postgresql://postgres.eeatmwmiruleeolotiqn:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
});

module.exports = pool;