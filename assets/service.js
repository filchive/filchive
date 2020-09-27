const lotus = require('./lotus.js')
const conf = require('../conf.js')
const retrievePath = conf.retrievePath;
const path = require('path');


async function retrieveData(dataCid, outFile){
	 let dest = path.join(retrievePath, outFile);
	console.log(`start to retrieve data cid:[${dataCid}], path:[${dest}]`);
	try{
		let queryOfferRet = await lotus.ClientMinerQueryOffer('t01782', dataCid);
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
		return await lotus.ClientRetrieve(retrievalOffer, dest);

	}catch (e) {
		console.log(e);
		throw new Error(`retrieve data ${dataCid} failed`);
	}
}

async function storeData(file){
	console.log(`start store data, path:[${path}]`)
	try {
		let minerInfoRet = await lotus.StateMinerInfo('t01782');
		let peerId = minerInfoRet.result.PeerId;
		if(!peerId){
			throw new Error('get peerId failed');
		}
		let importRet =  await lotus.ClientImport(path);
		console.log(importRet);
		if(!(importRet && importRet.result && importRet.result.Root)){
			throw new Error('get data cid failed');
		}
		const { '/': dataCid } = importRet.result.Root;
		console.log(`dataCid:[${dataCid}]`);
		let dealSizeRet = await lotus.ClientDealSize(dataCid);
		let queryAskRet = await lotus.ClientQueryAsk(peerId, 't01782');
		let epochPrice = calculateStorageDealPrice(queryAskRet.result.Ask.Price, dealSizeRet.result.PieceSize);
		const {'result': {'Height': chainHeight}} = await lotus.ChainHead();
		const {'result': wallet} = await lotus.WalletDefaultAddress();
		let dataRef = {
			Data: {
				TransferType: 'graphsync',
				Root: {
					'/': dataCid
				},
				PieceCid: null,
				PieceSize: 0
			},
			Wallet: wallet,
			Miner: 't01782',
			EpochPrice: epochPrice,
			MinBlocksDuration: 700000,
			FastRetrieval: true,
			DealStartEpoch: chainHeight + 5760,
		}
		return await lotus.ClientStartDeal(dataRef);
	}catch (e) {
		console.log(e);
		throw new Error('store data failed');
	}
}

async function queryData(dealCid){
	let dealInfo = await lotus.ClientGetDealInfo(dealCid);
	console.log(dealInfo);
	return dealInfo;
}

function calculateStorageDealPrice(askPrice, pieceSize) {
	const BigNumber = require('bignumber.js');

	let ask = new BigNumber(askPrice).multipliedBy(pieceSize);
	let gib = 1 << 30;

	let epochPrice = ask.dividedBy(gib).decimalPlaces(0);

	return epochPrice.toString(10);
}


module.exports = {
	storeData,
	retrieveData,
	queryData
}

