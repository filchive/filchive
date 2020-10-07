const express = require('express');

const router = express.Router();
const service = require('../assets/service');
const nsUrl = 'https://filchive.github.io/';
const axios = require('axios');


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

router.post('/store', (req, res, next) => {
	console.log(req.files[0]);
	service.storeData(req.files[0].path).then((ret) => {
		console.log(ret);
		res.json({
			result: 'ok'
		});
	}).catch((e) => {
		console.log(e);
		res.json({
			result: 'failed',
			message: e.message
		})
	})
});

router.post('/retrieve', (req, res, next) => {
	const {
		dataCid: dataCid,
		outFile: outFile
	} = req.body;
	service.retrieveData(dataCid, outFile).then(ret => {
		console.log(ret);
		res.json({
			result: 'ok'
		});
	}).catch(e => {
		res.json({
			result: 'failed',
			message: e.message
		})
	})

})

module.exports = router;

