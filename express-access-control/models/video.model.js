const mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  user_id: {
    type: String
  },
});

mongoose.model('Video', videoSchema);
