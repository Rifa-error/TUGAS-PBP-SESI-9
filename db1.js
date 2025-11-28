const mysql = require('mysql2');

const db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'perpustakaan'
});

db1.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
});

module.exports = db1;
