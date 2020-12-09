<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}

axios(({url:'http://123.207.32.32:8000/home/multidata'})).then((res)=>{
  console.log(res);
})

axios.get({
  baseURL:'http://123.207.32.32:8000',
  url:'/home/data',
  timeout:5,
  params:{
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res);
})

// 发送并发请求
axios.all([axios({url:'http://123.207.32.32:8000/home/multidata'}),
  axios({
    url:'http://123.207.32.32:8000/home/data',
    params:{
      type: 'pop',
      page: 1
  }
})]).then(axios.spread((res1, res2) => {
  console.log(res1, res2);
}))

// .then(res =>{

// })
// 全局设置
axios.default.baseURL = 'http://123.207.32.32:8000';
axios.default.timeout = 5000;

// 创建对应实例
const instance = axios.create({
  baseURL:'http://123.207.32.32:8000',
  timeout:5000,
});

instance({
  url:'/home/multidata',
}).then(res => {
  console.log(res);
})

import {request} from './network/request.js';

request({
  url: '/ home/multidata'
},res => console.log(res),
  err => console.log(err)
  )

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
