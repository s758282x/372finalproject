const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.eeatmwmiruleeolotiqn:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false, // required by Supabase
  },
});

module.exports = pool;
