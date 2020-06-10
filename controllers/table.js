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
        '<th>' + 'Age' + '</th>' +
        '</tr>';
    var i = 0;
    freaks = freaks.map(o => o.toObject());
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
exports.add = function(req, res) {
    db.on();
    Freak.findOne({ username: req.body.username }, function(e, freak) {
        if (null === freak) {
            Freak.create({ username: req.body.username, quickpoint: parseInt(req.body.quickpoint, 10), normalpoint: parseInt(req.body.normalpoint, 10), password: req.body.password, age: parseInt(req.body.age, 10) }, () => {
                Freak.find().sort({ date: 'ascending' })
                    .exec(function(err, freaks) {
                        if (err) return handleError(err);
                        var data = tableAdd(freaks);
                        db.off();
                        res.json({ data: data,error:""});

                    });


            });
        } else {
            Freak.find(function(err, freaks) {
                if (err) return handleError(err);
                var data = tableAdd(freaks);
                db.off();
                res.json({ data: data, error: 'Name belongs to the other account' });

            });
        }
    });

}
//edit update
exports.edit = function(req, res) {
    db.on();
    Freak.findOne({ username: req.body.username }, function(e, freak) {
        if (null === freak) {
            Freak.updateOne({ _id: req.body.check }, { username: req.body.username, quickpoint: parseInt(req.body.quickpoint, 10), normalpoint: parseInt(req.body.normalpoint, 10), password: req.body.password, age: parseInt(req.body.age, 10) }, () => {
                Freak.find(function(err, freaks) {
                    if (err) return handleError(err);
                    var data = tableAdd(freaks);
                    db.off();
                    res.json({ data: data, erorr: '' });


                });

            });

        } else if (req.body.check != freak._id) {
            Freak.find(function(err, freaks) {
                if (err) return handleError(err);
                var data = tableAdd(freaks);
                db.off();
                res.json({ data: data, error: 'Name belongs to the other account' });

            });

        } else
            Freak.updateOne({ _id: req.body.check }, { username: req.body.username, quickpoint: parseInt(req.body.quickpoint, 10), normalpoint: parseInt(req.body.normalpoint, 10), password: req.body.password, age: parseInt(req.body.age, 10) }, () => {
                Freak.find(function(err, freaks) {
                    if (err) return handleError(err);
                    var data = tableAdd(freaks);
                    db.off();
                    res.json({ data: data, erorr: '' });

                });

            });

    });

}
exports.delete = function(req, res) {
    db.on();
    Freak.deleteOne({ _id: req.body.check }, () => {
        Freak.find(function(err, freaks) {
            if (err) return handleError(err);
            db.off();
            var data = tableAdd(freaks);
            res.json({ data: data });

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
exports.search = function (req,res) {
    db.on();
    console.log(req.body.name);
    Freak.find({username:{$regex :req.body.name,$options: 'i'}},function(err, freaks) {
        if (err) return handleError(err);
        var data = tableAdd(freaks);
        db.off();
        res.json({ data: data });

    });
}