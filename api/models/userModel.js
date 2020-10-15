'use strict';
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    validate: [isEmail, 'Invalid email'],
    createIndexes: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },

});

const User = mongoose.model('User', UserSchema);
module.exports = User;