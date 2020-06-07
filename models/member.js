const Freak = require('./freaking.js');
const db = require('./db.js');
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
    db.on();
    Freak.create(array, function(e) {
        // body...
        console.log(e);
        db.off();
    });
}
insert();