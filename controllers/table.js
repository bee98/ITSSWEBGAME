var mongoose = require('mongoose');
var pool = require('../models/database.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

function tableAdd(freaks) {
    var data = '<table id="myTable">' + '<tr>' +
        '<th>' + 'Name' + '</th>' +
        '<th>' + 'Pass' + '</th>' +
        '<th>' + 'Quick' + '</th>' +
        '<th>' + 'Normal' + '</th>' +
        '<th>' + 'Age' + '</th>' +
        '</tr>';
    var i = 0;
    freaks.forEach((freak) => {
        data = data + '<tr>' +
            '<td>' + freak.username + '</td>' +
            '<td>' + freak.password + '</td>' +
            '<td>' + freak.quickpoint + '</td>' +
            '<td>' + freak.normalpoint + '</td>' +
            '<td>' + freak.age + '</td>' +
            '<td><label><input ' + 'value = ' + '"' + freak._id + '"' + 'name="check" type="radio"' + 'onclick="myFunction(' + i + ')"' + ' /></label></td>'
        '</tr>';
        i++;
    });
    data = data + '</table>';
    return data;

}
exports.add = function (req, res) {
    // pool.on;
    pool.connect((err, client, done) => {
        if (err) throw err;
        const query = `
        SELECT username, password, quickpoint, normalpoint, age FROM players, ranking WHERE players.id = ranking.id AND username=$1;
        `;
        client.query(query, [req.body.username], (error, result) => {
            if (err) {
                return handleError(console.error());
            }
            if (result.rows.length === 0) {
                const regis_query = `
                INSERT INTO players(username, password, age) VALUES($1,$2,$3);
                `;
                client.query(regis_query, [req.body.username, req.body.password, parseInt(req.body.age, 10)], (error) => {
                    if (err) {
                        console.log(error)
                    }
                });

                const ranking_query = `INSERT INTO ranking(id, quickpoint, normalpoint) VALUES((SELECT id from players WHERE username=$1),$2,$3);`;
                client.query(ranking_query, [req.body.username, req.body.quickpoint, req.body.normalpoint], (error) => {
                    if (err) {
                        console.log(error)
                    }
                });

                const query = `
                    SELECT username, password, quickpoint, normalpoint, age FROM players, ranking WHERE players.id = ranking.id;
                `;

                client.query(query, [], (e, results) => {
                    done();
                    if (e) return handleError(e);
                    var data = tableAdd(results.rows);
                    res.json({ data: data, erorr: '' });
                });
            } else {
                const query = `
                    SELECT username, password, quickpoint, normalpoint, age FROM players, ranking WHERE players.id = ranking.id;
                `;
                client.query(query, [], (e, result) => {
                    done();
                    // if (e) return handleError(e);
                    var data = tableAdd(result.rows);
                    res.json({ data: data, erorr: 'Name belongs to the other account' });
                });
            }
        });
    });
}
//edit update
exports.edit = function (req, res) {
    // pool.on;
    pool.connect((err, client, done) => {
        if (err) return handleError(err);
        const query = `
            UPDATE players SET password=$1, age=$2 WHERE players.username = $3;
        `;
        client.query(query, [req.body.password, parseInt(req.body.age, 10), req.body.username], (e) => {
            if (e) return handleError(e);
        });

        const query1 = `
            UPDATE ranking SET quickpoint=$1, normalpoint=$2 FROM players WHERE ranking.id = players.id AND players.username = $3;
        `;
        client.query(query1, [parseInt(req.body.quickpoint, 10), parseInt(req.body.normalpoint, 10), req.body.username], (e) => {
            if (e) return handleError(e);
        });

        const query2 = `
            SELECT username, password, quickpoint, normalpoint, age FROM players, ranking WHERE players.id = ranking.id;
        `;
        client.query(query2, [], (e, result) => {
            done();
            if (e) return handleError(e);
            var data = tableAdd(result.rows);
            res.json({ data: data, erorr: '' });
        });
    });
}
exports.delete = function (req, res) {
    // pool.on;
    pool.connect((err, client, done) => {
        const query = `
        DELETE FROM ranking WHERE ranking.id = (SELECT id FROM players WHERE players.username = $1);
        `;
        client.query(query, [req.body.username], (e) => {
            if (e) return handleError(e);
        });

        const query1 = `
            DELETE FROM players WHERE players.username = $1;
        `;
        client.query(query1, [req.body.username], (e) => {
            if (e) return handleError(e);
        });

        const query2 = `
        SELECT username, password, quickpoint, normalpoint, age FROM players, ranking WHERE players.id = ranking.id AND players.username <> $1;
        `;
        if (err) return handleError(err);
        client.query(query2, [req.body.username], (e, result) => {
            done()
            var data = tableAdd(result.rows);
            res.json({ data: data });
        });
    });
}
exports.index = function (req, res) {
    // pool.on;
    pool.connect((err, client, done) => {
        const query = `
        SELECT username, password, quickpoint, normalpoint, age FROM players, ranking where players.id = ranking.id;
        `;
        if (err) return handleError(err);
        client.query(query, [], (e, result) => {
            done()
            console.log(result.rows)
            var data = tableAdd(result.rows)
            res.render('table', { data: data })
        });
    });
}
exports.search = function (req, res) {
    // pool.on;
    console.log(req.body.name);
    pool.connect((err, client, done) => {
        if (err) return handleError(err);
        const query = `
        SELECT username, password, quickpoint, normalpoint, age FROM players, ranking WHERE players.id = ranking.id AND players.username LIKE $1;
        `;
        client.query(query, [req.body.name + '%'], (e, result) => {
            done();
            console.log(result.rows)
            var data = tableAdd(result.rows);
            res.json({ data: data });
        });
    });
}