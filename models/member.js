const pool = require('./database.js');
const array = [
    { username: "admin", password: "admin", quickpoint: 0, normalpoint: 0 },
    { username: "Phu", password: "123456", quickpoint: 0, normalpoint: 0 },
    { username: "Hoang", password: "123456", quickpoint: 0, normalpoint: 0 },
    { username: "Quang", password: "123456", quickpoint: 0, normalpoint: 0 },
    { username: "Ken", password: "123456", quickpoint: 0, normalpoint: 0 },
    { username: "Kai", password: "123456", quickpoint: 0, normalpoint: 0 },
    { username: "Eric", password: "123456", quickpoint: 0, normalpoint: 0 },
    { username: "Erik", password: "123456", quickpoint: 0, normalpoint: 0 },
];

function insert() {
    pool.connect((err, client, done) => {
        const query2 = `
        INSERT INTO ranking(id, quickpoint, normalpoint) VALUES((SELECT id from players WHERE username=$1),$2,$3);
        `;
        const query1 = `
        INSERT INTO players(username, password, age) VALUES($1,$2,$3);
        `;
        if (err) throw err;
        array.forEach((player) =>{
            client.query(query1, [player.username, player.password, player.age], (e) => {
            });
            client.query(query2, [player.username, player.quickpoint, player.normalpoint], (e) => {
            });
        })
        done();
    });
}
insert();