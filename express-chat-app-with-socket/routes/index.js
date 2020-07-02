var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Join Chat' });
  // res.json({client_secret: 'Hello1'});
});

/* GET home page. */
router.get('/chat', function(req, res, next) {
  res.render('chatform', { title: 'Chat' });
});


router.get('/amit', function(req, res, next) {
//   res.render('index', { title: 'Express' });
    res.json({client_secret: 'amit'});
});
    

module.exports = router;
