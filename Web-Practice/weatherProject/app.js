const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.send(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log("Post Received");
});

const portNumber = 5500;
app.listen(portNumber, function(){
    console.log(`Server is starting running on port ${portNumber}`);
});

// app.get("/",(req, res)=>{
//     console.log(2)
//     // const cityName = "London";
//     // const apiKey = "1338095bfb862f7a0281b6cfd3fe96b8";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=1338095bfb862f7a0281b6cfd3fe96b";
//     console.log(url);
//     https.get(url, function(response){
//         console.log(response.statusCode);
        
//         response.on("data", function(data){
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp
//             const weatherDescription = weatherData.weather[0].description
//             const icon =weatherData.weather[0].icon
//             const iconURL = "http://openweathermap.org/img/wn/"+ icon+"@2x.png";
//             res.write();
//             res.send();

//         })
//     })
//     res.send("Server is running")
// });