var express = require('express');
var app = express();
var bodyParser=require("body-parser"); 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/webproject'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "Connection not success")); 
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/display', function(req, res) {
  db.collection("weblab").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.render('display',{result:result});
    db.close;
});});
app.post('/', function(req,res){ 
  var no= req.body.no;
  var name= req.body.name;
  var amount=req.body.amount; 
  var write={"no":no,"name":name,"amount":amount}
  db.collection('weblab').insertOne(write,function(err, collection){ 
    if (err) throw err; 
    console.log("sucessfully inserted"); 
    db.close;
});});
app.listen(9999);