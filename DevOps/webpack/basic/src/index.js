import data from './data.json';
function fn1() {
    console.log('fn1');
}
fn1();
console.log(data);

// 开发环境下的打包
// webpack ./src/index.js -o ./dist/bundle.js --mode=development
// 生产环境
// webpack ./src/index.js -o ./dist/bundle.js --mode=production