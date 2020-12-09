var fs = require('fs');
window.onload = function(){
    var btn = this.document.querySelector('#btn');
    var myDiv = this.document.querySelector('#myDiv');
    fs.readFile('nameList.txt', (err, data) =>{
        myDiv.innerHTML = data;
    })
}