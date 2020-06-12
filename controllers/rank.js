var Freak = require('../models/freaking.js');
var db = require('../models/db.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
exports.rank = function(req, res, next) {
    db.on();
    let table = '<table id="myTable">' + '<tr>' +
        '<th>' + 'Quick ' + '</th>' +
        '<th>' + '		' + '</th>' +
        '<th>' + 'Normal' + '</th>' +
        '<th>' + '		' + '</th>' +
        '</tr>';
    Freak.find().sort({ quickpoint: -1 }).limit(10).exec(
        function(err, quick) {
            

            Freak.find().sort({ normalpoint: -1 }).limit(10).exec(
                function(err, normal) {
                    console.log(quick);
                    db.off();
                    for (let i = 0; i < 10; i++) {
                        table = table + '<tr>' +
                            '<td>' + quick[i].username + '</td>' +
                            '<td>' + quick[i].quickpoint + '</td>' +
                            '<td>' + normal[i].username+ '</td>' +
                            '<td>' + normal[i].normalpoint + '</td>' +
                            '</tr>';
                    }
                    console.log(table);
                    res.json({data:table});

                }
            );
        }
    );
}