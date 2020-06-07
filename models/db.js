const express = require('express');
const mongoose = require('mongoose');
const connection = mongoose.connection;
exports.on = function()
{
try
{
  mongoose.connect("mongodb://localhost:27017/Game",{useNewUrlParser: true});	
}
catch(e)
{
    console.log(e);
}
};
exports.off = function()
{
	connection.close();
}