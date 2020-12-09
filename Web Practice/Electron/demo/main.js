var electron = require('electron');
var app = electron.app; // 引用app
var BrowserWindow = electron.BrowserWindow;//窗口引用
var mainWindow = null;//声明打开的主要窗口；

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width:800,
        height: 800,
        webPreferences:{nodeIntegration: true}
    });
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', ()=>{
        mainWindow = null;
    })
})
