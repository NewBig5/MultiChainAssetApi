// import { WanBridge  } from './index.js'
const { WanBridge  } = require('wanchain-cross-sdk/packages/core') 



const ApiKey = '57b5005c60b8c444d880afe02d0a41cf4dc269f9c186940aa169412bb245f1c0'
const SecretKey = 'eae6109bd79f3ca8e4d2adc6078867ea193ac8b6ac30140abd24cce78ce42def'
let bridge

function readyPromise(bc) {
  return new Promise((resolve, reject) => {
    if (bc._ready) return resolve();

    const onReady = () => {
      bc.removeListener('error', onError);
      resolve();
    };
    const onError = (err) => {
      bc.removeListener('ready', onReady);
      reject(err);
    };

    bc.once('ready', onReady);
    bc.once('error', onError);
  });
}
async function crossSdkInit() {
  bridge = new WanBridge("mainnet"); // testnet or mainnet


  let iwanAuth = {
    apiKey: ApiKey,
    secretKey: SecretKey
  };
  
  await bridge.init(iwanAuth);

  // console.log("xxxxx:", bridge.configService)
  // console.log("bridge:",bridge)

  await readyPromise(bridge)
    // console.log("ready assetPairs:", assetPairs)
    // console.log("---------------ready:", bridge.configService.curConfig)
  options = {
    account: "0xDd0931Db1A429d863c5aA22E04917f8370255415",
    // chainNames:['Wanchain','Ethereum'],
    protocols:['Erc20']
  }
  let b = await bridge.getChainAssets(options)
  console.log("b:", Object.keys(b), b)
}

function getBridge() {
  return bridge
}
module.exports = {
  crossSdkInit,getBridge
}