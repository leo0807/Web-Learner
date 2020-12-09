const fs = require('fs');
fs.writeFile('./test.txt', 'what shoudl we eat for lunch?\n',{flag='w', encoding='utf-8'},function(err){
    if(err) console.log(err);
    else console.log('Writing Completed');
});
fs.writeFile('./test.txt', 'Steak!!!\n',{flag='a', encoding='utf-8'},function(err){
    if(err) console.log(err);
    else console.log('Writing Completed');
});

const writeFs = (path, content) =>{
    return new Promise(function(resolve, reject){
        fs.writeFile(path, content,{flag='a', encoding='utf-8'},function(err){
            if(err) reject(err);
            else resolve('Writing Completed');
        });
    })  
};

async function writeList(){
    await writeFs('lc.txt',"content1");
    await writeFs('lc.txt',"content2");
    await writeFs('lc.txt',"content3");
}
writeList();