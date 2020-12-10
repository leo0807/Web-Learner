const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

const apiKey ="2eb2e45e3d3ec3fc461e3056c9aced4b-us17";
const listId ="97b8bd6778";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    console.log(1);
    //res.sendFile('path-to-file');
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/"+listId;
    const options={
        method:"POST",
        auth:"scoott:"+apiKey
    }
    const request = https.request(url, options,function(response){
        console.log(response.statusCode);
        if(response.statusCode===200){
            console.log(123);
            res.send("Successful");
        }else{
            res.send("Successful");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
});

const portNumber=3000;
app.listen(portNumber, function(){
    console.log("There server is running on port " +portNumber);
});