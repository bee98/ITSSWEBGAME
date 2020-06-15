var pool = require('../models/database.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

exports.update = function(req, res, next) {
    console.log(req.body);
    pool.on();
    pool.connect((err, client, done) => {
        const query = `
        SELECT username, password, players.id, normalpoint, quickpoint FROM players, ranking where username=$1 AND password = $2 AND players.id = ranking.id;
        `;
        if (err) throw err;
        client.query(query, [req.body.username, req.body.password], (err, result) => {
            if (err) {
                console.error(err);
            }
            else if(data.quickpoint < req.body.quickpoint && data.normalpoint < req.body.normalpoint){
                const query = `
                UPDATE ranking SET quickpoint=$1,normalpoint = $2 WHERE id=(SELECT id from players WHERE username=$3);
                `;
                if (err) throw err;
                client.query(query, [req.body.quickpoint, req.body.normalpoint, req.body.username], (err, result) => {
                    done();
                });
            }else if(data.quickpoint < req.body.quickpoint){
                const query = `
                UPDATE ranking SET quickpoint=$1 WHERE id=(SELECT id from players WHERE username=$2);
                `;
                client.query(query, [req.body.quickpoint,  req.body.username], (err, result) => {
                    done();
                });
            }else if (data.normalpoint < req.body.normalpoint){
                const query = `
                UPDATE ranking SET normalpoint=$1 WHERE id=(SELECT id from players WHERE username=$2);
                `;
                client.query(query, [req.body.normalpoint,  req.body.username], (err, result) => {
                    done();
                });
            }
            res.json({});
        });
    });
}