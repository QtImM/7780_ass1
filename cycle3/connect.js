const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user99',
  password: process.env.DB_PASSWORD || 'user99',
  database: process.env.DB_NAME || 'comp7780'
};

async function testConnection() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected!');
  } catch (error) {
    console.error('Database connection failed.');
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testConnection();
