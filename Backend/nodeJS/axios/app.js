
const { rejects } = require('assert');
const axios = require('axios');
const { resolve } = require('path');
const httpURL = "https://api.apiopen.top/getJoke?page=1&count=10&type=image";
const request = require('request');
axios.get(httpURL, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((res)=>{
    console.log(res);
});

const getClassURL = async() => {
    let {response, body} = await req(httpURL);
    const reg = /<span class="search-indexl-L">l/
};

const req = (url) => {
    return new Promise((resolve,reject) => {
        request.get(url, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((err,res,body)=>{
            if(err) reject(err);
            else {
                resolve(res,reject);
            }
        });
    });
};

const getMovies = async(url, movieTypes) => {
    const {response, body} = await req(url);
    const reg = /<a class="pic-pack-outer" target="\_blank" href="(.*?)".*?><img/igs;
    let res;
    let arrList = [];
    while(res = reg.exec(body)){
        arrList.push(res[1]);
        parsePage(res[1]);
    }
};

const parsePage = async(url) => {
    let {response, body} = await req(url);
    
}