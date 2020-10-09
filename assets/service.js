const lotus = require('./lotus.js')
const conf = require('../conf.js')
const retrievePath = conf.retrievePath;
const path = require('path');
const fs = require('fs');


async function retrieveData(miner, dataCid, id){
	let destDir = path.join(retrievePath, id);
	let destFile = `${path.join(destDir, dataCid)}.mp4`
	console.log(`start to retrieve data cid:[${dataCid}], path:[${destDir}]`);
	if(fs.existsSync(destFile)){
		return {file: destFile};
	}
	if(!fs.existsSync(destDir)){
		fs.mkdirSync(destDir, {
			recursive: true,
		});
		fs.chmodSync(destDir, 0o777);
	}
	try{
		let queryOfferRet = await lotus.ClientMinerQueryOffer(miner, dataCid);
		if(!queryOfferRet || !queryOfferRet.result || queryOfferRet.result.Err){
			throw new Error('query offer failed');
		};
		const {'result': wallet} = await lotus.WalletDefaultAddress();
		const o = queryOfferRet.result;
		let retrievalOffer = {
			Root: o.Root,
			Piece: null,
			Size: o.Size,
			Total: o.MinPrice,
			UnsealPrice: o.UnsealPrice,
			PaymentInterval: o.PaymentInterval,
			PaymentIntervalIncrease: o.PaymentIntervalIncrease,
			Client: wallet,
			Miner: o.Miner,
			MinerPeer: o.MinerPeer
		}
		let ret = await lotus.ClientRetrieve(retrievalOffer, destFile);
		ret['file'] = destFile;
		return ret;

	}catch (e) {
		console.log(e);
		throw new Error(`retrieve data ${dataCid} failed`);
	}
}

module.exports = {
	retrieveData
}

