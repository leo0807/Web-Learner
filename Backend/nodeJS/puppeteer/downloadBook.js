const puppeteer = require('puppeteer');
const fs = require('fs');
const { log } = require('console');
const httpUrl = 'https://sobooks.cc';
(async function(){
    const debugOptions = {
            defaultViewport:{
                width: 1400,
                height: 800
            },
            headless: false,
            // 设置放慢每一个步骤
            slowMo: 250
    };
    // const option = {headless: true};
    let browser = await puppeteer.launch(debugOptions);

    function lcWait(milliSeconds){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve("Successfully run the delay function" + milliSeconds);
            }, milliSeconds);
        })
    }
    const parseTxt = async() => {

    };
})()
