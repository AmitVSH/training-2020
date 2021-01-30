const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://amitkadam:9552015542@amitkadam-cm1du.mongodb.net/vue2020', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(!!err)
    console.log("MongoDB connection error.", err);
  else
   console.log("MongoDB connection created.");
})

require('./user.model');
require('./video.model');
