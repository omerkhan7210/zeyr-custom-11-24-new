import mysql from 'mysql';

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'zeyr_custom',
  password: '',
  database: 'zeyr-custom',
});


export default pool;
