const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  email: {
    type: String,
    required: true,  
    unique: true,    
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'] 
  },
  dateOfBirth: {
    type: Date,
    required: true,  
  },
  address: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now  
  }
});


const User = mongoose.model('Users', UserSchema);

module.exports = User;