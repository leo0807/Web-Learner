import NewProj from './NewProj';
const item = new NewProj();

// beforeALL(()=>{
//     // 在所有测试用例之前 before all the test case
//     console.log("Brefore ALL");
// })
beforeEach(()=>{
    console.log("each");
})

afterEach(()=>{
    console.log("each");
})

afterAll(() => {
    console.log("after all");
})
describe('Mary', ()=>{
    test('Test Method', () => {
    item.people(1);
    item.services();
    item.wait()
     expect(item.help).toEqual('Mary is waiting');
})
})

describe('Wendy', () => {
    afterEach(()=>{
        console.log("Wendy after each");
    })
    test('Test Method', () => {
        item.people(2);
        item.services();
        item.wait()
        expect(item.help).toEqual('Wendy is waiting');
    })
})


// 钩子函数 afterALL， beforeALL， afterEach， beforeEach

// 钩子函数在父级分组可作用域子集，类似继承
// 钩子函数同级分组作用域互不干扰，各起作用
// 先执行外部的钩子函数，再执行内部的钩子函数