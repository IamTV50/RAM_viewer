require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USERNAME,
    host: process.env.PG_HOST,
    database: process.env.PG_DB_NAME,
    password: process.env.PG_PASSWD,
    port: process.env.PG_PORT
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};

//structure from: https://medium.com/@eslmzadpc13/how-to-connect-a-postgres-database-to-express-a-step-by-step-guide-b2fffeb8aeac