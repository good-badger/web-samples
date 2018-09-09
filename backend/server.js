const Web3 = require('web3');
var express = require('express');
var router = express.Router();

var express = require('express');
var app = express();

const PORT = 3000;

require('dotenv').config();
var network = process.env.ETH_NETWORK;
const BADGE_TOKEN_ABI = require('../src/contracts/ERC721Badge.json');

var BADGE_TOKEN_ADDRESS = process.env.REACT_APP_BADGE_TOKEN_ADDRESS;

var requests = [];

app.get('/api/community/callback', function(req, res, next) {
  // Comment out this line:
  if(requests.some((val) =>{return val.wallet == req.query.wallet && val.issued==false})){
    // Request already exists
    res.json({
      success: false
    });
  }else{
      var r = req.query;
      r.issued = false;
      r.expires = -1;
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
    requests[idx].expires = Date.now() + 10000;

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
  res.json(requests);
});

getTokensForWallet = (wallet) => {
  var web3 = new Web3(new Web3.providers.HttpProvider(network));
  var badgeTokenInstance = new web3.eth.Contract(BADGE_TOKEN_ABI.abi, BADGE_TOKEN_ADDRESS);
  return badgeTokenInstance.methods.balanceOf(wallet).call().then((result) => {
    var tot = result;
    var promises = [];
    for(i=0; i<tot; ++i){
      promises.push(badgeTokenInstance.methods.tokenOfOwnerByIndex(wallet,i).call());
    }
    return Promise.all(promises).then((results) => {
      var promises2 = [];
      for(j=0; j<results.length; ++j){
        promises2.push(badgeTokenInstance.methods.getArtwork(results[j]).call());
      }
      return Promise.all(promises2).then((artworks) => {
        var badges = [];
        for(j=0; j<results.length; ++j){
          badges.push({
            idx: results[j], 
            artwork: artworks[j]
          });
        }
        return badges;
      })
    })
  })
};

app.get('/api/badges', function(req, res, next) {
  var wallet = req.query.wallet;
  getTokensForWallet(wallet).then((badges) => {
    res.json(badges);
  })
});

getTokenForId = (tokenId) => {
  var web3 = new Web3(new Web3.providers.HttpProvider(network));
  var badgeTokenInstance = new web3.eth.Contract(BADGE_TOKEN_ABI.abi, BADGE_TOKEN_ADDRESS);
  var promises = [];
  var badge = {};
  promises.push(badgeTokenInstance.methods.getArtwork(tokenId).call().then((res) => {badge['artwork'] = res; return res}));
  promises.push(badgeTokenInstance.methods.getDescription(tokenId).call().then((res) => {badge['description'] = res; return res}));
  promises.push(badgeTokenInstance.methods.getIssuer(tokenId).call().then((res) => {badge['issuer'] = res; return res}));
  promises.push(badgeTokenInstance.methods.getDate(tokenId).call().then((res) => {badge['date'] = res; return res}));
  return Promise.all(promises).then((results) => {
    return badge;
  })
};

app.get('/api/badge', function(req, res, next) {
  var tokenId = req.query.id;
  getTokenForId(tokenId).then((badge) => {
    res.json(badge);
  })
});

app.listen(PORT); //listens on port 3000 -> http://localhost:3000/
console.log("Listening on port: ", PORT);