const mysql = require("mysql");
const axios = require("axios");
const cheerio = require("cheerio");

// Initial Page
let page = 1;
let count = 1;

const options = {
    user: 'root',
    host: "localhost",
    port: "3306", //optianal, the default setting is 3306
    password: "Aa416260!",
    database: "book",
    // insecureAuth : true
}
const con = mysql.createConnection(options);

con.connect((err) => {
    if (err) throw err;
    console.log("successful");
});

// acquire the link from the nth page

async function getPageUrl(num){
    let httpUrl = "https://sobooks.cc/page/" + num;
    const res = await axios.get(httpUrl);
    // Parse data
    const $ = cheerio.load(res.data);
    $("#cardslist .card-item .thumb-img>a").each((i, element) => {
        const href = $(element).attr("href");
        getPageInfo(href);
    })
}
// Page Detail Information
async function getPageInfo(href) {
    const res = await axios.get(href);
    const $ = cheerio.load(res.data);
    const bookImg = $(".article-content .bookpic img").attr("src");
    let bookName = $(".article-content .book-info li:nth-child(1)").text();
    bookName = bookName.substring(3, bookName.length);
    let authorName = $(".article-content .book-info li:nth-child(2)").text();
    authorName = authorName.substring(3, authorName.length);
    let format = $(".article-content .book-info li:nth-child(3)").text();
    format =  format.substring(3, format.length);
    let tag = $(".article-content .book-info li:nth-child(4)").text();
    tag = tag.substring(3, tag.length);
    let pubTime = $(".article-content .book-info li:nth-child(5)").text();
    pubTime = pubTime.substring(3, pubTime.length);
    let score = $(".article-content .book-info li:nth-child(6) b").attr("class");
    score = score[score.length - 1];
    let category = $("#mute-category a").text();

    let contentBrief = $(".content .article-content p").text();
    // Data too long
    contentBrief = contentBrief.substring(0, 20);
    let authorBrief = $(".content .article-content").text();
    authorBrief = authorBrief.substring(0, 20);
    const bookUrl = $(".e-secret form").attr("action");

    let arr = [bookImg, bookName,bookUrl,authorName, format, tag, pubTime, score, category, contentBrief, authorBrief];
    let strSql = "insert into book (bookImg, bookName,bookUrl,authorName, format, tag, pubTime, score, category, contentBrief, authorBrief) values (?,?,?,?,?,?,?,?,?,?,?)";
    // Insert into boll
    con.query(strSql, arr, (err, results) => {
        if(err) console.log(err);
        else console.log("successful");
    });
    console.log(contentBrief);
}
// getPageUrl(page);
getPageInfo("https://sobooks.cc/books/17247.html");