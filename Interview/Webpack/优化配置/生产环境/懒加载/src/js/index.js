console.log('Index.js 文件被加载了');
import { mul } from './test';

document.getElementById('btn').onclick = function () {
  // 懒加载
  // 预加载 prefetch：会在使用之前，提前加载JS文件
  // 正常加载可以认为是并行加载，（同一时间加载多个文件）
  // 预加载等其他资源加载完毕，浏览器空闲了，再加载资源
  import(/*webpackChunkName: 'test'*/'./test').then(({ mul }) => {
    console.log(mul(2, 3));
  })
}