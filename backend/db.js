const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'cartdb',
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306)
};

const db = mysql.createConnection({
    ...dbConfig
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});
module.exports = db;