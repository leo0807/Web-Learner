// import { fetchData, fetchTwoData , fetchThreeData, fetchFourData} from './fetchData.js';
// const url = "http://a.jspang.com/jestTest.json";

// test('fetchData test', () => {
//     fetchData(data => {
//          expect(data).toEqual({
//              success: true
//          })
//     })
//     // 异步方法 ，需要等到返回结果， 否则结果均为true
//     done()
// })
// test('fetchTwoData test', () => {
//     return fetchTwoData().then(res => {
//         expect(res.data).toEqual({
//              success: true
//          })
//     })
// })
// // test('fetchThreeData test', () => {
// //     expect.asserttions(1); //断言 必须执行一次 expect
// //     return fetchThreeData().catch(res => {
// //         expect(res.toString().indexOf('404') > -1).toBe({true})
// //     })
// // })

// test('fetchFourData test', async() => {
//     // Method 1:
//     // await expect(fetchFourData()).resolves.toMatchObject({
//     //     data:{
//     //         success: true
//     //     }
//     // })
//     //Method 2:
//     const response = await fetchFourData();
//     expect(res.data).toEqual({
//         success: true
//     })
// })

