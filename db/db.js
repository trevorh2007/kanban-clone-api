const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'R6HPzs64',
    database: 'kanban_database',
    host: 'localhost',
    port: 5432
})

module.exports = pool;