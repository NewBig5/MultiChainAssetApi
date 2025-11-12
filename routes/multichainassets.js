var express = require('express');
var router = express.Router();
const BigNumber = require('bignumber.js')

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
    price:true,
    account: account,
    chainNames:[
      'Ethereum',      'OKT Chain',         'BNB Chain',
      'Wanchain',      'Cardano',           'Solana',
      'Base',          'Avalanche C-Chain', 'Moonriver',
      'Polygon',       'Arbitrum',          'XDC Network',
      'XRP Ledger',    'VeChain',           
      // 'Bitrock',
      'OP Mainnet',    'Bitcoin',           'Telos',
      'VinuChain',     'Metis',             'Odyssey',
      'Dogecoin',      'Polkadot',          'Moonbeam',
      'edeXa',         'Linea',             'Blast',
      'Polygon zkEVM', 'zkSync Era',        'Fantom',
      'f(x)Core',      'Tron',              'Litecoin',
      'Songbird',      'Energi',            'PLYR',
      'Shido',         'Celo',              'Noble',
      'X Layer',       
      // 'Sonic',             
      'Sui',
      'World Chain',   'Unichain',          'Astar',
      'Kava'
    ],
    protocols:['Erc20']
  }
  try{
    let b = await bridge.getChainAssets(options)

    if(!req.query.all || req.query.all!='true'){
      console.log("not all-------------------------------------")
      let chainNames = Object.keys(b)
      let usefulChains = {}
      for(let i=0; i<chainNames.length; i++){
        let chainData = b[chainNames[i]]
        let usefulData = chainData.filter(item=>item.balance != "" && item.balance != "0")
        if(usefulData.length > 0) {
          usefulChains[chainNames[i]] = usefulData
        }
      }
      b = usefulChains
    }
    console.log("b data:", b)
    // calculate the usdValue.
    let chainNames = Object.keys(b)
    for(let i=0; i<chainNames.length; i++){
      let chainData = b[chainNames[i]]
      chainData = chainData.map(item=>{
        if(item.balance == "" || item.balance == "0" || item.price == "0") {
          item.usdValue = "0"
          console.log("------------------------------usdValue = 0", item)
        } else {
          item.usdValue = BigNumber(item.balance).times(item.price).toString()
        }
        return item
      })
      b[chainNames[i]] = chainData
    }

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
