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

    // Enter the website and the number of pages
    async function getAllNum(){
        let page = await browser.newPage();
        // remove the timeout limit
        // await page.setDefaultNavigationTimeout(0); 
        await page.goto(httpUrl);
        const pageNum = await page.$eval('.pagination li:last-child span', element => {
            let text = element.innerHTML;
            const length = text.length;
            text = text.substring(1, length - 2).trim();
            return text;
        });
        page.close();
        return pageNum;
    }

    async function pageList(num){
        let pageListUrl = `https://sobooks.cc/page/${num}`;
        let currentPage = await browser.newPage();
        // await currentPage.setDefaultNavigationTimeout(0); 
        // 访问列表地址
        await currentPage.goto(pageListUrl);
        // await currentPage.waitForNavigation();
        let arrPage = await currentPage.$$eval('.card .card-item .thumb-img>a', elements => {
            let arr = [];
            elements.forEach((element, i)=>{
                var obj = {
                    href: element.getAttribute("href"),
                    title: element.getAttribute("title")
                };
                arr.push(obj);
            })
            console.log(arr);
            return arr;
        })
        currentPage.close();

        // 通过获取的数组的地址和标题去请求书记的详情页
        arrPage.forEach(async(pageObj,i) => {
            lcWait(4000 * i)
            getPageInfo(pageObj);
        })
    }

    async function getPageInfo(pageObj){
        let page = await browser.newPage();
        // 截取谷歌请求
        await page.setRequestInterception(true);
        // 监听请求时间，并对请求进行拦截
        page.on('request', interceptedRequest => {
            // 通过URL模块对请求对地址进行解析
            let urlObj = url.parse(interceptedRequest.url());
            if(urlObj.hostname === 'googleads.g.doubleclick.net'){
                // 如果是谷歌广告请求，那么就放弃请求，响应太慢
                interceptedRequest.abort();
            }else{
                interceptedRequest.continue();
            }
        })
        (await page).goto(pageObj.href);
        let eleA = (await page).$(".dltable tr:nth-child(3) a:last-child");
        let aHref = (await eleA).getProperty('href');

        aHref = aHref._remoteObject.value;
        aHref = aHref.split('?url=')[1];
        let content = `{"title": "${pageObj.title}", "href": "${aHref}"}`;
        fs.writeFile('book.txt', content, {flag: "a"}, function(){
            console.log('Downloading book'+ pageObj.title);
            page.close();
        });
    }

    // const pageNumber = await getAllNum();
    // pageList(1);
    console.log('Finished');
})()
// 获取https://sobooks.cc/,所有电子书的链接



// Obtain all the links for each page

// Enter the detail page of each Ebook and acquire the download link