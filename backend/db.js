const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'cartdb',
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306)
};

const db = mysql.createConnection({
    ...dbConfig
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});
module.exports = db;