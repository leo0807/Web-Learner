const app = require('./app.js');
const {proj1, proj2} = app;

// Hest 不接受 ES6 import 方法 只可以用CommonJS 语法
// 需要使用babel转换器
test('proj1-300', ()=>{
     expect(proj1(300)).toBe('Primum Service');
})

test('proj2-2000', ()=>{
     expect(proj2(2000)).toBe('Double Service');
})