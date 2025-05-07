//import mongoose from 'mongoose';
const mongoose = require('mongoose');

// Import the Guid module for generating unique identifiers
const { v4: uuidv4 } = require('uuid');
//define the user schema for MongoDB using Mongoose

//My user should have an email, a hashed password, and a timestamp for when the user was created and last updated.
// The email should be unique, and the password should be hashed for security.
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
      },
    email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
}, { timestamps: true }); //Automatically adds createdAt and updatedAt to every user.

// Create a Mongoose model based on the user schema
module.exports = mongoose.model('User', userSchema);
