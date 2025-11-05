var express = require('express');
var router = express.Router();

let chains = require('../config/chainConfig.json')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/chains', function(req, res, next) {
  tokenPairs = await this.iwan.getTokenPairs({tags: ["bridge"]});


  let chaina = Object.keys(chains)
  res.send(chaina);
});
router.get('/assets', function(req, res, next) {
  console.log("req.query.chain:", req.query.chain, req.query)
  let obj = {}
  if(!req.query.chain) {
    obj.chain = 'WAN'
  } else {
    obj.chain = req.query.chain
  }
  obj.success = true
  res.send(obj);
});
module.exports = router;
