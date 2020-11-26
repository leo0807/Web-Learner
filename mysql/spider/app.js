const mysql = require("mysql");
const axios = require("axios");
const cheerio = require("cheerio");
let page = 1;
let count = 1;

// acquire the link from the nth page

async function getPageUrl(num){
    let httpUrl = "https://sobooks.cc/page/" + num;
    const res = await axios.get(httpUrl);
    // console.log(res.data);
    const $ = cheerio.load(res.data);
    $("#cardList .card-item .thumb-img>a").each((i, element) => {
        const href = $(element).attr("href");
        console.log(i,href);
    })
}
async function getPageInfo(href) {
    const res = await axios.get(href);
    const $ = cheerio.load(res).data;
}
getPageUrl(page);