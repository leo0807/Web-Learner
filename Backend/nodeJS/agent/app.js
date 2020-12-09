const axios = require('axios');
const httpUrl = 'https://www.doutula.com/article/list/?page=1';
const options = {
    proxy:{
        host: '162.125.113.224',
        port: 8118
    },
};
axios.get(httpUrl, options).then((res)=>{
    console.log(res.data);
});