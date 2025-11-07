var express = require('express');
var router = express.Router();

let chains = require('../config/chainConfig.json')
const crossSdk = require('../crossSdk.js')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let account = req.query.account
  if(!account) {
    res.send({success:false,data:{}});
  }
  let bridge = crossSdk.getBridge()
  options = {
    account: account,
    // chainNames:['Wanchain','Ethereum'],
    protocols:['Erc20']
  }
  try{
    let b = await bridge.getChainAssets(options)
    res.send({success:true, data: b});
  }catch(err){
    console.log("getChainAssets err:", err)
  }
});
router.get('/chains', function(req, res, next) {

  // tokenPairs = await this.iwan.getTokenPairs({tags: ["bridge"]});


  let chaina = Object.keys(chains)
  res.send(chaina);
});
router.get('/assets', function(req, res, next) {
  let bridge = crossSdk.getBridge()
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
