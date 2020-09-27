const express = require('express');

const router = express.Router();
const service = require('../assets/service');


router.get('/test', (req, res)=>{
	res.end('ok');
})

router.post('/store', (req, res, next)=>{
	console.log(req.files[0]);
	service.storeData(req.files[0].path).then((ret)=>{
		console.log(ret);
		res.json({
			result: 'ok'
		});
	}).catch((e)=>{
		console.log(e);
		res.json({
			result: 'failed',
			message: e.message
		})
	})
});

router.post('/retrieve', (req, res, next)=>{
	const {
		dataCid: dataCid,
		outFile: outFile
	} = req.body;
	service.retrieveData(dataCid, outFile).then(ret=>{
		console.log(ret);
		res.json({
			result: 'ok'
		});
	}).catch(e=>{
		res.json({
			result: 'failed',
			message: e.message
		})
	})

})

module.exports = router;

