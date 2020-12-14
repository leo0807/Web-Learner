new Promise(function (resolve, reject){
    console.log('a')
    setTimeout(function(){
        console.log('b')
    })
    resolve()
}).then(() => {
    console.log('c')
})
setTimeout(function () {
    console.log('d')
})
console.log('e')