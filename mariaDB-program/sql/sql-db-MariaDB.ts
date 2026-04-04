import * as mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.MDB_HOST,
    user: process.env.MDB_USER,
    password: process.env.MDB_PASSWORD,
    database: process.env.MDB_NAME
})

export default pool;