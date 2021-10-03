const Pool = require('pg').Pool;

var pool;

if (process.env.DATABASE_URL) {
    pool = new Pool({
        connection: process.env.DATABASE_URL
    })
} else {
    pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432
    })
}


module.exports = pool;