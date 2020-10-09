const http = require('http');
const apiRoot = '/api'
const querystring = require('querystring')

function callApi(path, method, callback, data) {
    let opts = {
        path: `${apiRoot}/${path}`,
        method: method,
        headers: {
			'Cache-Contorl' : 'no-store'
		}
    };
    if (data) {
        opts.headers['Content-Length'] = data.length;
        if (typeof data == 'string') {
            opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        } else {
            opts.headers['Content-Type'] = 'application/json';
            data = JSON.stringify(data);
        }
    }
    console.log(opts);
    let req = http.request(opts);
    let buff = [];
    req.on('response', resp => {
        resp.on('data', chunk => {
            //console.log(chunk.toString())
            buff.push(chunk);
        });
        resp.on('end', () => {
            let data;
            if (buff.length > 0) {
				let contentType = resp.headers['content-type'];
				console.log(contentType);

				if(contentType && contentType.startsWith('application/json')){
					console.log(Buffer.concat(buff).toString())
					data = JSON.parse(Buffer.concat(buff).toString());
				}else if(contentType && contentType.startsWith('video/mpeg')){
					data = Buffer.concat(buff);
				}else{
					data = Buffer.concat(buff).toString();
				}
                //console.log(data);
            }
			if(resp.statusCode != 200){
				callback(new Error(data.message));
				return;
			}
            if (callback && typeof callback == "function") {
            	//console.log(data);
            	callback(null, data, resp.headers['x-total-count']);
            }
        })
    });
    req.on('error', err => {
        console.log('error')
        console.log(err);
        callback(err);
    });
    if (data) {
        console.log(data);
        req.write(data);
    }
    req.end();
}

function get(path, callback, data) {
    callApi(path, 'GET', callback, data);
}

function post(path, callback, data) {
    callApi(path, 'POST', callback, data);
}

export default {
    getPageCount(callback){
		get('page-count', callback)
	},
	getContent(page, callback){
    	get(`page/${page}`, callback)
	},
	loadVideo(cri, callback) {
		get(`retrieve?${querystring.stringify(cri)}`, callback)
	}

}
