const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getPage = async(num) =>{
    let httpURL = `https://www.app-echo.com/api/recommend/sound-day?page=${num}`;
    const res = await axios.get(httpURL);
    // console.log(res.data);
    res.data.list.forEach(function(item, index){
        
        const title = item.sound.name;
        const musicURL = item.sound.source;
        const fileName = path.parse(musicURL).name;
        let content = `${title},${musicURL},${fileName}\n`;
        fs.writeFile('music.txt', content, {flag: 'a'}, function(){
            console.log(`${title} Inputed`);
        });
        download(musicURL, title);
    })
};

//Download the music
const download = async(url, title) => {
    console.log(111111);
    const res = await axios.get(url, {responseType: "stream"});
    const extension = path.extname(title);
    const filePath = fs.createWriteStream(`./music/${title}${extension}`);
    res.data.pipe(filePath);
    res.data.on('close', function(){
        filePath.close();
    });
};
getPage(1);