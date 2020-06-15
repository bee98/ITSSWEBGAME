const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '23051998',
  port: 5432,
});

module.exports = pool;

exports.on = function()
{
  pool.on('error', (err, client) => {
    console.error('Error:', err);
  });
};

exports.off = function()
{
  console.log('calling end')
  pool.end();
  console.log('pool has drained')
}

