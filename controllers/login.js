var Freak = require('../models/freaking.js');
var db = require('../models/db.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

exports.signin = function(req, res) {
    console.log(req.body);
    db.on();
    Freak.findOne({ username: req.body.username, password: req.body.password }, function(e, data) {
        db.off();
        if (null == data) res.render('index', { error: 'Login information is incorrect' });
        else
            res.render('game', { username: data.username });
    });
}
exports.signup = function(req, res) {
    db.on();
    console.log(req.body);
    if (req.body.password != req.body.password2) 
        {
            db.off();
            res.json({ status: 'Failure!' });
        }
    else
    {
       Freak.findOne({ username: req.body.username }, function(e, data) {
        if (null == data) {

            Freak.create({ username: req.body.username, password: req.body.password, quickpoint: 0, normalpoint: 0 ,age: parseInt(req.body.age,10)}, function(e) {
                // body...
                console.log(e);
                db.off();
            });
            res.json({ status: 'Success!' });
        } else {
            db.off();
            res.json({ status: 'Failure!' });
        }
    }); 
    }
    

}