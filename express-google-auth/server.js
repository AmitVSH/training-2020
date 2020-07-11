require('./models/db');

const express = require('express');
const userController = require('./controllers/userController');
const path = require('path');
const expresshbs = require('express-handlebars');
const bodyparser = require('body-parser');
const passport = require('passport');
const cookieSesion = require('cookie-session');
require('./utils/passport.js')
var app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSesion({name: 'session', keys: ['key1', ['key2']]}));

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expresshbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


app.listen(3000, () => {
  console.log("Server started at post number: 3000");
})

var indexRouter = require('./routes/index');
// var googleRouter = require('./routes/googleAuth');
app.use('/', indexRouter);
// app.use('/', googleRouter);
app.use('/users', userController);

app.use(express.static('public'))


app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/done');
  });
  
app.get('/failed', (req, res) => res.send("Login failed.") );
app.get('/done', (req, res) => {
  // console.log("res:: ", res);
  res.render('users/view', {viewTitle: 'User', user: res}) 
});