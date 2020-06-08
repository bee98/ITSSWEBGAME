const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('freak', new Schema({username:String,password:String,quickpoint:Number,normalpoint:Number,age:Number}),'freak');