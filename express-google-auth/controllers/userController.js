const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {

  User.find({}).lean().exec(function(err, users) {
    if (!err) {
      // handle result
      console.log("users",users);

      res.render("users/list", {
        title: "Users",
        users: users,
        saved_msg: !!req.query.saved
      });
    } else {
      // error handling
      console.log('Error retriving users');
    };
  });
  
});

router.get('/create', (req, res) => {
  res.render('users/addOrEdit', {viewTitle: 'Add/Edit User'});
});

router.post('/', (req, res) => {
  insertUser(req, res);
});

router.delete('/:id', async (req, res) => {

  User.remove({
      _id: req.params.id
  }, function(err, bear) {
      if (err)
          res.send(err);

      res.json({ message: 'Successfully deleted' });
  });

});

function insertUser(req, res) {
  console.log("Req: ", req.body);
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.mobile = req.body.mobile;
  user.city = req.body.city;
  user.role = req.body.role;
  user.password = req.body.password;
  user.save( (err, doc) => {
    if(!err) res.redirect('users?saved=1');
    else
      console.log("Error saving user.");
  });
}
module.exports = router;
