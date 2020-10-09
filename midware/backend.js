const express = require('express');

const router = express.Router();
const service = require('../assets/service');
const nsUrl = 'https://filchive.github.io/';
const axios = require('axios');
const fs = require('fs');


router.get('/test', (req, res) => {
	res.end('ok');
})

router.get('/page-count', (req, res) => {
	axios.get(nsUrl, {
		headers: {
			'Cache-Control': 'no-store'
		}
	}).then(
		resp => {
			res.end(resp.data + '')
		}
	).catch(
		err => {
			console.log(err);
			res.sendStatus(500)
		}
	);
});
router.get('/page/:page', (req, res) => {
	let page = req.params.page;
	if (!page) {
		res.status(400).send('Page Must Be Specified')
	} else {
		axios.get(`${nsUrl}${page}.json`, {
			headers: {
				'Cache-Control': 'no-store'
			}
		}).then(resp => {
			res.json(resp.data);
		}).catch(err => {
			console.log(err);
			res.sendStatus(500)
		});
	}
})


router.get('/retrieve', (req, res, next) => {
	const {
		miner: miner,
		dataCid: dataCid,
		id: id
	} = req.query;
	service.retrieveData(miner, dataCid, id).then(ret => {
		console.log(ret);
		if(ret.error){
			console.log(ret.error);
			res.json({
				result: 'failed',
				message: ret.error.message
			});
		}else{
			res.append('Content-Type', 'video/mp4');
			let rs = fs.createReadStream(ret.file).on('open', ()=>{
				rs.pipe(res);
			}).on('error', err=>console.log(err));
		}
	}).catch(e => {
		res.json({
			result: 'failed',
			message: e.message
		})
	})

})

module.exports = router;

