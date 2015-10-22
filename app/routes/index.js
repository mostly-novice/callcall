var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('*', function(req, res){
  res.send('<h1>Oops</h1> - <h3>404 not found buddy</h3>', 404);
});

module.exports = router;
