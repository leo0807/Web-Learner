// const changeBgc = () =>{
//     document.body.style.backgroundColor = 'red';
// }
// changeBgc();
// // OOP
// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     eat(){
//         alert(`${this.name} eat something`);
//     }
//     speak(){
//         alert(`${this.name} \`s age is ${this.age}`);   
//     }
// }
// // Inh
// class Student extends People{
//     constructor(name, age, number){
//         super(name, age);
//         this.number = number;
//     }
//     study(){
//         alert(`Student Number ${this.number} is learning`);
//     }
// }


function loadImg(src){
    let promise = new Promise(function(resolve, reject){
        const img = document.createElement('img');
        img.onload = function(){
            resolve(img);
        };
        img.onerror = function(){
            reject('Loading Failed');
        };
    });
    return promise;
}
const src = 'https://uploadfiles.nowcoder.com/images/20191018/63_1571399271580_F19C9085129709EE14D013BE869DF69B';
let result = loadImg(src);

result.then(function(img){
    alert(`width: ${img.width}`);
    return img;
}).then(function(img){
    alert(`height: ${img.height}`);
    return img;
}).then(
    function()
    {
        alert(img.src);
        return img;
    }
).catch(function(err){
    alert(err);
})

