const mysql = require('mysql');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = pool;