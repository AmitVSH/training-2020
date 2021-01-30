const express = require('express');
// const userController = require('./controllers/userController');
const path = require('path');
const expresshbs = require('express-handlebars');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());


app.listen(3000, () => {
  console.log("Server started at post number: 3000");
})

// app.use('/users', userController);
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/def', function (req, res) {
  var request = require("request");

  var options = { method: 'GET',
    url: 'https://api.sendgrid.com/v3/marketing/field_definitions',
    headers: { authorization: 'Bearer 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' },
    body: '{}' };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

})


app.get('/user', function (req, res) {
  var request = require("request");
  var options = { method: 'PUT',
    url: 'https://api.sendgrid.com/v3/marketing/contacts',
    headers:
     { 'content-type': 'application/json',
       authorization: 'Bearer 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' },
    body:
     { list_ids: [ 'bb84ea7f-39b9-470c-b67a-8695f6647de2' ],
       contacts:
        [ {
          // email: 'amitvsh03@gmail.com',
            email: 'rahulshimpi88@gmail.com',
            first_name: 'User1FName',
            last_name: 'User1LName',
            postal_code: '422422',
            state_province_region: 'Mh',
            custom_fields: {
              e1_T: "false"
            } } ] },
    json: true };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });

})

app.get('/user/verify', function (req, res) {
  console.log("\n\nEmail::  ", req.query.email );

  var request = require("request");
  var options = { method: 'PUT',
    url: 'https://api.sendgrid.com/v3/marketing/contacts',
    headers:
     { 'content-type': 'application/json',
       authorization: 'Bearer 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' },
    body:
     { list_ids: [ 'bb84ea7f-39b9-470c-b67a-8695f6647de2' ],
       contacts:
        [ {
            email: req.query.email,
            first_name: 'User1FName',
            last_name: 'User1LName',
            postal_code: '422422',
            state_province_region: 'Mh',
            custom_fields: {
              e1_T: "true"
            } } ] },
    json: true };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });

})
