var express = require('express');
var multer  = require('multer');
var router = express.Router();

var upload = multer({ dest: 'uploads/' })

//服务器逻辑，RESTful API
router.post('/answer', function(req, res, next) {

    var answer = "问题是:"+req.body.content+". 回答是：xxx"

	res.json({"text":answer})

});
router.post('/feedback', upload.array('images', 3), function(req, res, next) {

	console.log(req.body)
	console.log(req.files)
	res.json({"text":true})

});



module.exports = router;
