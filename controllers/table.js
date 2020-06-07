var mongoose = require('mongoose');
var Freak = require('../models/freaking.js');
var db = require('../models/db.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

function tableAdd(freaks) {
    var data = '<table id="myTable">' + '<tr>' +
        '<th>' + 'Name' + '</th>' +
        '<th>' + 'Pass' + '</th>' +
        '<th>' + 'Quick' + '</th>' +
        '<th>' + 'Normal' + '</th>' +
        '</tr>';
    var i = 0;
    freaks = freaks.map(o => o.toObject());
    freaks.forEach((freak) => {
        data = data + '<tr>' +
            '<td>' + freak.username + '</td>' +
            '<td>' + freak.password + '</td>' +
            '<td>' + freak.quickpoint + '</td>' +
            '<td>' + freak.normalpoint + '</td>' +
            '<td><label><input ' + 'value = ' + '"' + freak._id + '"' + 'name="check" type="radio"' + 'onclick="myFunction(' + i + ')"' + ' /></label></td>'
        '</tr>';
        i++;
    });
    data = data + '</table>';
    return data;

}
exports.add = function(req, res) {
    db.on();
    Freak.create({ username: req.body.username, quickpoint: parseInt(req.body.quickpoint, 10), normalpoint: parseInt(req.body.normalpoint, 10), password: req.body.password }, () => {
        Freak.find().sort({ date: 'ascending' })
            .exec(function(err, freaks) {
                if (err) return handleError(err);
                var data = tableAdd(freaks);
                db.off();
                res.render('table', { data: data });

            });


    });
}
//edit update
exports.edit = function(req, res) {
    db.on();
    Freak.updateOne({ _id: req.body.check }, { username: req.body.username, quickpoint: parseInt(req.body.quickpoint, 10), normalpoint: parseInt(req.body.normalpoint, 10), password: req.body.password }, () => {
        Freak.find(function(err, freaks) {
            if (err) return handleError(err);
            var data = tableAdd(freaks);
            db.off();
            res.render('table', { data: data });



        });

    });
}
exports.delete = function(req, res) {
    // body...
    db.on();
    Freak.deleteOne({ _id: req.body.check }, () => {
        Freak.find(function(err, freaks) {
            if (err) return handleError(err);
            var data = tableAdd(freaks);
            res.render('table', { data: data });

        });

    });

}
exports.index = function(req, res) {
    db.on();
    Freak.find(function(err, freaks) {
        if (err) return handleError(err);
        var data = tableAdd(freaks);
        db.off();
        res.render('table', { data: data });

    });
}