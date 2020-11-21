const cheerio = require('cheerio');
//Similar to JQuery
const axios = require('axios');
const fs = require('fs');
const urlModule = require('url');
const path = require('path');
const { http } = require('follow-redirects');

const httpUrl = 'https://www.doutula.com/article/list/?page=1';
//Count total num of pages
const getTotalNum = async() =>{
    
    const res = await axios.get(httpUrl);
    let $ = cheerio.load(res.data);
    let length = $('.pagination li').length;
    const allNum = $('.pagination li').eq(length - 2).find('a').text();
    return allNum;
}

// 将延迟函数封装成promise对象
async function lcWait(milleSeconds){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("成功延迟"+milleSeconds)
        }, milleSeconds);
    })
}
// Get current page info

const getPageInfo = async(pageNum) =>{
    const httpUrl = 'https://www.doutula.com/article/list/?page='+pageNum;
    const res = await axios.get(httpUrl).then((res)=>{
        // console.log(res.data);
        // Use cheerio to parse content
        let $ = cheerio.load(res.data);
        $('#home .col-sm-9>a').each((index, element)=>{
            let pageUrl = $(element).attr('href');
            let title = $(element).find('.random_title').text();
            let reg = /(.*?)\d/igs;
            title = reg.exec(title)[1];
            fs.mkdir('./img/'+ title, function (err) {
                if(err) console.log(err);
                else console.log(`Directory './img/'+ ${title} create successfully!`);
            });
            await lcWait(50 * i);
            parsePage(pageUrl, title);
            console.log(title);
        })
    });
};


const parsePage = async(url, title) =>{
    let res = await axios.get(url);
    let $ = cheerio.load(res.data);
    
    $('.pic-content img').each((index, element)=>{
        let imgUrl = $(element).attr('src');
        const extName = path.extname(imgUrl);
        const imgPath = `img/${title}/${title}-${index}${extName}`;
        const ws = fs.createWriteStream(imgPath);
        axios.get(imgUrl,{responseType:'stream'}).then(function(res){
            res.data.pipe(ws);
            console.log(`${imgUrl} loaded`);
            res.data.on('close', function() {
                ws.close();
            })
        })
        
    });
};

//Start point
const spider = async() => {
    const allPageNum = await getTotalNum();
    for(let i = 0; i < allPageNum; i++){
        await lcWait(3000 * i);
        getPageInfo(i);
    }
};
spider();