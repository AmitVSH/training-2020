const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Video = mongoose.model('Video');

const { hasCreatePermission, hasUserUpdatePermission, hasUserDeletePermission, hasUserReadPermission } = require("../utils/permissions");

router.get('/', (req, res) => {

  Video.find({}).lean().exec(function(err, videos) {
    if (!err) {
      // handle result
      console.log("videos",videos);

      res.render("videos/list", {
        title: "Videos",
        videos: videos,
        saved_msg: !!req.query.saved
      });
    } else {
      // error handling
      console.log('Error retriving videos');
    };
  });
  
});

router.get('/create', (req, res) => {
  res.render('videos/addOrEdit', {title: 'Add/Edit Video'});
});

router.post('/', async (req, res) => {

    const user = await User.findOne( { _id: "5efcc270da7219bfc1d85589" } ) // user
    // const user = await User.findOne( { _id: "5efcc1f58f966f1bed5494fa" } ) //admin

    const video = await Video.findOne( { _id: req.params.id } )

    if( !hasCreatePermission(user.role) )
        res.status(403).send({ message: "Permission not available" });
    
    insertVideo(req, res);
});

router.delete('/:id', async (req, res) => {

    const user = await User.findOne( { _id: "5efcc270da7219bfc1d85589" } ) // user
    // const user = await User.findOne( { _id: "5efcc1f58f966f1bed5494fa" } ) //admin

    const video = await Video.findOne( { _id: req.params.id } )

    if( !hasUserDeletePermission(user.role, user._id == video.user_id ) )
        res.status(403).send({ message: "Permission not available" });

    Video.remove({
        _id: req.params.id
    }, function(err, bear) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
    
});

function insertVideo(req, res) {
  console.log("Req: ", req.body);
  var video = new Video();
  video.name = req.body.name;
  video.email = req.body.src;
  video.user_id = "5efcc1f58f966f1bed5494fa"; //admin
  video.save( (err, doc) => {
    if(!err) res.redirect('videos?saved=1');
    else
      console.log("Error saving video.");
  });
}
module.exports = router;
