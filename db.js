const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "code1",
    host: "localhost",
    post: 5432,
    database: "message"
});

module.exports= pool;