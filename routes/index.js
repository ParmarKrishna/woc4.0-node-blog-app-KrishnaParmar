var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

router.get('/posts',function(req,res,next){
  res.render('posts',{title:'All Posts'})
});

router.get('/create',function(req,res,next){
  res.render('create',{title:'Write something...?'})
});

router.get('/viewpost',function(req,res,next){
  res.render('viewpost',{title:'Post $'})
});
module.exports = router;
