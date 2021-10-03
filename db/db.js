const pg = require('pg');
const connectionString = process.env.DATABASE_URL

var pool;

if (process.env.DATABASE_URL) {
    pg.defaults.ssl = { rejectUnauthorized: false }
    pool = new pg.Pool({
        connectionString,
    })
} else {
    pool = new pg.Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432
    })
}


module.exports = pool;