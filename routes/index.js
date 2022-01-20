var express = require('express');
var path = require('path');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');
var router = express.Router();
const bodyParser= require('body-parser')
const dbo=require('../db/conn');
const { ObjectId } = require('mongodb');

var db=dbo.getDb();

router.use(express.static(path.join(__dirname, 'public')));
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/images')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,file.fieldname + '-' + uniqueSuffix + '.jpeg');
    }
});
const upload = multer({storage: storage});

router.get('/', function(req, res, next) {
  let db=dbo.getDb();
  const cursor=db.collection('postsCollection').find({}).toArray((err,result)=>{
    if (err) throw err;
    res.render('index', { title: 'Blog',blog:result});
  });
  console.log(cursor);
});

router.get('/home', function(req, res, next) {
  let db=dbo.getDb();
  const cursor=db.collection('postsCollection').find({}).toArray((err,result)=>{
    if (err) throw err;
    res.render('index', { title: 'Blog',blog:result});
  });
  console.log(cursor);
});

router.get('/create',function(req,res,next){
  res.render('create',{title:'Write something...?'})
});

router.get('/viewpost/:id',function(req,res,next){
  var db=dbo.getDb();
  let id=req.params.id;
  if(ObjectId.isValid(id)){
    let blog=db.collection('postsCollection').findOne({_id:ObjectId(id)},function(err,result){
      if(err) res.redirect('/');
      console.log(result.banner)
      res.render('viewpost',{title:"post",blog : result})
      //console.log(result);
    }
    )}});

router.post('/posted',upload.single('bannerImage'), (req, res) => {
  let db=dbo.getDb();
  
  var today = new Date();
  var date = 
            String(today.getDate()).padStart(2, '0') + '/' +
            String(today.getMonth()+1).padStart(2, '0') + '/' +
            String(today.getFullYear());
  console.log(req.file.fileName)
  var newobj={
    title : req.body.title,
    name : req.body.name,
    body : req.body.body,
    gist : req.body.gist,
    banner : req.file.filename,
    createdOn : date,
  }
  db.collection('postsCollection').insertOne(newobj,function(err,resp){
    if(err) throw err;
    //console.log(resp);
    res.redirect('/')
  })
})
module.exports = router;
