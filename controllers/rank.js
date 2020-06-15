var pool = require('../models/database.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
exports.rank = function (req, res, next) {
    pool.on;
    let table = '<table id="myTable">' + '<tr>' +
        '<th>' + 'Quick ' + '</th>' +
        '<th>' + '		' + '</th>' +
        '<th>' + 'Normal' + '</th>' +
        '<th>' + '		' + '</th>' +
        '</tr>';

    pool.connect((err, client, done) => {
        const query = `
        SELECT username, quickpoint FROM players, ranking where players.id = ranking.id ORDER BY quickpoint DESC;
        `;
        if (err) throw err;
        client.query(query, [], (e, quick_result) => {
            const query = `
            SELECT username, normalpoint FROM players, ranking where players.id = ranking.id ORDER BY normalpoint DESC;
            `;
            if (err) throw err;
            client.query(query, [], (e, normal_result) => {
                done();
                quick = quick_result.rows 
                normal = normal_result.rows
                for (let i = 0; i < 10; i++) {
                    table = table + '<tr>' +
                        '<td>' + quick[i].username + '</td>' +
                        '<td>' + quick[i].quickpoint + '</td>' +
                        '<td>' + normal[i].username + '</td>' +
                        '<td>' + normal[i].normalpoint + '</td>' +
                        '</tr>';
                }
                res.json({ data: table });
            });
        });
    });
}