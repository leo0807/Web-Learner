import '../css/index.css';
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
// @ts-ignore

// 使用ES10语法 让某个文件被单独打包成一个chunk
// import动态加载

// 初始设置名字为ID，可通过加参数修改
import(/*webpackChunkName: 'test' */'./test')
  .then(({ mul, add }) => {
    // 文件加载成功
    // eslint-disable-next-line
    console.log(mul(3, 5));
  })
  .catch(() => {
    // 文件加载失败
  })
// @ts-ignore
console.log(mul(2, 3));