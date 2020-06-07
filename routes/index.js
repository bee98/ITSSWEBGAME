var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var table = require('../controllers/table');
var login = require('../controllers/login');
var rank = require('../controllers/rank');
var point = require('../controllers/point');
var jsonParser = bodyParser.json();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{error:''});
});
router.get('/play', function(req, res, next) {
  res.render('game',{username:''});
});
router.get('/logout', function (req, res) {
   res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   res.redirect(301,'');
});
router.get('/usermanager',function (req, res,next) {
	table.index(req,res);
});
router.post('/add',(req, res, next)=>{table.add(req, res)});
router.post('/edit',(req, res, next)=>{table.edit(req, res)});
router.post('/delete',(req, res, next)=>{table.delete(req, res)});
router.post('/signin',function(req, res, next) {
  login.signin(req,res);
});
router.post('/signup',function(req, res, next) {
  login.signup(req, res);
});
router.post('/ranking',function(req, res, next){
 rank.rank(req,res,next);
});
router.post('/point',function(req, res, next){
 point.update(req, res, next);
});
module.exports = router;
