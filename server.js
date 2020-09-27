var express = require('express');
var app = express();
const compression = require('compression')
const conf = require("./conf.js");
const multer = require('multer');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const upload = multer({
	dest: conf.uploadPath,
	limits: {
		fieldSize: 32 * 1024 * 1024 * 1024
	}
})
app.use(compression({filter: compressFilter}));
app.all('*', (req, res, next)=>{
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	next();
})
app.use(upload.any());
app.use("/api", require("./midware/backend.js"));

app.get('/', function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.redirect("/index.html");
});

app.use(express.static('dist'));

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json(err);
});


var port = process.argv[2] || 80;

app.listen(port, function() {
  console.log('app listening on port ' + port);

});

function compressFilter(req, res){
	if(req.baseUrl && req.baseUrl.indexOf('/api') > -1){
		return false;
	}
	return compression.filter(req, res);

}
console.log();
