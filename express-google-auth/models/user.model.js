const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  city: {
    type: String
  },
  role: {
    type: String
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  avatar: {
    type: String
  },
});

mongoose.model('User', userSchema);
