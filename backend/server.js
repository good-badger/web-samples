var express = require('express');
var router = express.Router();

var express = require('express');
var app = express();

const PORT = 3000;

require('dotenv').config();

var requests = [];

app.get('/api/community/callback', function(req, res, next) {
  // Comment out this line:
  if(requests.some((val) =>{return val.wallet == req.query.wallet})){
    // Request already exists
    res.json({
      sucess: false
    });
  }else{
      requests.push(req.query);
      // And insert the new request
      res.json({
        sucess: true
      });

  }
});

app.get('/api/community/requests', function(req, res, next) {
  // Comment out this line:

  // And insert something like this instead:
  res.json(requests);
});

app.listen(PORT); //listens on port 3000 -> http://localhost:3000/
console.log("Listening on port: ", PORT);