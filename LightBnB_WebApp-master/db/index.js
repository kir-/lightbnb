const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  password: '123',
  database: 'lightbnb'
});

pool.connect(()=>console.log('connected sql'));

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};