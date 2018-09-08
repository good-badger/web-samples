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
      success: false
    });
  }else{
      var r = req.query;
      r.issued = false;
      requests.push(r);
      // And insert the new request
      res.json({
        success: true
      });

  }
});

app.get('/api/community/requestIssued', function(req, res, next) {
  // Comment out this line:
  var idx = parseInt(req.query.idx);
  if(requests.length >= idx){
    requests[idx].issued = true;
    // Request already exists
    res.json({
      success: true
    });
  }else{
    res.json({
      success: false
    });
  }
});

app.get('/api/community/requests', function(req, res, next) {
  // Comment out this line:

  // And insert something like this instead:
  res.json(requests);
});

app.get('/api/badges', function(req, res, next) {
  var wallet = req.query.wallet;
  var badges = [
    {
      artwork: '032',
      issuer: '1234',
      date: '2018-09-08T23:08:56.145Z', 
      description: '1 hour of community service',
      owner: '3456',
    },
    {
      artwork: '031',
      issuer: '1234',
      date: '2018-09-10T23:08:56.145Z', 
      description: '2 hour of community service',
      owner: '3456',
    }
  ];

  res.json(badges);
});

app.listen(PORT); //listens on port 3000 -> http://localhost:3000/
console.log("Listening on port: ", PORT);