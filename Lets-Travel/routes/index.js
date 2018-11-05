var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all hotels page. */
router.get('/all',function(req,res){
  res.render('all_hotels', { title: 'All Hotels' });
});

/* GET all hotels and pass parameter */
router.get('/all/:name',function(req,res){
  const name =req.params.name;
  res.render('all_hotels', { title: 'All Hotels',name });
});

module.exports = router;
