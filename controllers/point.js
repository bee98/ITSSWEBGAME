var Freak = require('../models/freaking.js');
var db = require('../models/db.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

exports.update = function(req, res, next) {
    console.log(req.body);
    db.on();
    Freak.findOne({ username: req.body.username }, function(e, freak) {
    	if(e) res.json({});
    	else if(null === freak){
    		db.off();
    		res.json({});
    	}   		 
        else if (freak.quickpoint < req.body.quickpoint && freak.normalpoint < req.body.normalpoint) Freak.updateOne({ username: req.body.username }, { quickpoint: req.body.quickpoint, normalpoint: req.body.normalpoint }, function(e) {
            db.off();
            res.json({});
        });
        else if (freak.quickpoint < req.body.quickpoint) Freak.updateOne({ username: req.body.username }, { quickpoint: req.body.quickpoint }, function(e) {
            db.off();
            res.json({});
        });
        else if (freak.normalpoint < req.body.normalpoint) Freak.updateOne({ username: req.body.username }, { normalpoint: req.body.normalpoint }, function(e) {
            db.off();
            res.json({});
        });
        else {
            db.off();
            res.json({});
        }
    });
}