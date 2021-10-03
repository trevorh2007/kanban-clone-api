const Pool = require('pg').Pool;

if (process.env.DATABASE_URL) {
    const pool = new Pool({
        connection: process.env.DATABASE_URL
    })
} else {
    const pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432
    })
}


module.exports = pool;