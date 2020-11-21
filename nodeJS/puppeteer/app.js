const { log } = require('console');
const puppeteer = require('puppeteer');

// Lanuch the browser
async function test(){
    // 实例开启浏览器
    // 可以配置为有界面浏览器或者无界面浏览器
    // 无界面效率更高
    // Setup Viewport
    const options = {
        defaultViewport:{
            width: 1400,
            height: 800
        },
        headless: false,
        // 设置放慢每一个步骤
        slowMo: 250
    }
    const browser = await puppeteer.launch(options);
    // Open a new Page
    const page = await browser.newPage();
    await page.goto("http://www.dytt8.net/index.htm"); 
    // 1.
    // 通过点击实现页面跳转
    // 获取页面对象
    // const elementHandles =  page.$$("#menu li a");
    // elementHandles[2].click();

    // 截屏
    // await page.screenshot({path: 'screenshot.png'});
    // // 获取页面内容 
    // 2.
    //  通过获取页面内容方式 获得链接
    // let elements = await page.$$eval("", (elements)=>{
    //     console.log(elements);
    //     // 创建一个数据去收集地址和内容
    //     let eles = [];
    //     elements.forEach(function(item,index){
    //         console.log(item.innerText);
            
    //         if(item.getAttribute("href") !== "#"){
    //             var eleObj = {
    //                 href: item.getAttribute("href"),
    //                 text: item.innerText
    //             }
    //             eles.push(eleObj);
    //         }
    //     })
    //     // 进入国内电影页面
    //     const gnPage = await browser.newPage();
    //     await gnPage.goto(elements[2].href);
    //     return eles;


    // });
    // 3
    // 通过表单输入进行搜索实现页面跳转
    const inputEle = await page.$(".search .formhue");
    // 让光标进入到输入框
    await inputEle.focus();
    // 往输入框输入内容
    await page.keyboard.type("蝙蝠侠");
    await page.$eval(".bd3rl .search", element => {
        element.addEventListener('click', function(event){
            event.cancelBubble = true;
        });
    })
    // 点击按钮
    const btn = await page.$(".searchr input[name='Submit']");
    await btn.click()
    // 页面监听控制台输出
    page.on('console', function(event){
        console.log(event.text());
    })
}
test();