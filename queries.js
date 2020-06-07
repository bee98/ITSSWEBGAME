const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '23051998',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Error:', err);
});

const getPlayers = (request, response) => {
    pool.query(`SELECT * FROM players`, (error, results) => {
        if (error){
            throw error
        }

        response.status(200).json(results.rows)
    })
}

const getPlayersById = (request, response) => {
    const id  = parseInt(request.params.id)
    pool.query(`SELECT * FROM players WHERE id=$1`, [id], (error, results) => {
        if (error){
            throw error
        }

        response.status(200).json(results.rows)
    })

}

const login = (request, response) => {
    const {username, password} = request.body
    pool.query(`SELECT * FROM players WHERE username=$1 AND password=$2;` , [username, password], (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getPlayers,
    getPlayersById,
    login,
}