var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {lowercase: true, unique: true, required: true, type: String},
  email: {lowercase: true, unique: true, required: true, type: String},
  salt: String,
  passwordHash: String
});

mongoose.model('User', UserSchema);
