var pool = require('../models/database.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

exports.signin = function (req, res) {
    pool.on('error', (err, client) => {
        console.error('Error:', err);
    });
    console.log(req.body);
    const query = `
    SELECT username, password, ranking.id, players.id, normalpoint, quickpoint FROM players, ranking where username=$1 AND password = $2 AND players.id = ranking.id;
    `;
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(query, [req.body.username, req.body.password], (err, result) => {
            done();
            if (err) {
                console.error(err);
                res.render('index', { error: 'Login information is incorrect' });
                return;
            }
            console.log(result.rows[0]);
            data = result.rows[0]
            res.render('game', { username: data.username, quick: data.quickpoint, normal: data.normalpoint });
        });
    });
}

exports.signup = function (req, res) {
    console.log(req.body);
    const { username, password, password2, age } = req.body;
    if (password != password2) {
        res.json({ status: 'Failure!' });
    }
    else {
        pool.on;
        const query = `
        SELECT username from players WHERE username = $1;
        `;
        pool.connect((err, client, done) => {
            if (err) throw err;
            client.query(query, [username], (e, data) => {
                if (data.rows.length === 0 || data === null) {
                    const regis_query = `
                        INSERT INTO players(username, password, age) VALUES($1,$2,$3);
                        `;
                    client.query(regis_query, [username, password, parseInt(age, 10)], (error) => {
                        if (err) {
                            console.log(error)
                        }
                    });

                    const ranking_query = `
                        INSERT INTO ranking(id, quickpoint, normalpoint) VALUES((SELECT id from players WHERE username=$1),$2,$3);
                        `;
                    client.query(ranking_query, [username, 0, 0], (error) => {
                        done();
                        if (err) {
                            console.log(error)
                        }
                    });
                    res.json({ status: 'Success!' });
                } else {
                    res.json({ status: 'Failure!' });
                }
            });
        });
    }
}