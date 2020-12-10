//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

var items = [];
let workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res){
    let day = date.getDate();
    res.render("list",{listTitle:day,newListItem:items});
});

app.post("/",function(req, res){
    var item = req.body.newItem;
    if(req.body.list==="work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req,res){
    res.render("list",{listTitle:"Work List", newListItem:workItems})
});

app.post("/work", function(req,res){
    var workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect("/wok");
});

app.get("/about", function(req,res){
    res.render("about");
});


app.listen(3000, function(){
    console.log("Server is starting running on port 3000");
});