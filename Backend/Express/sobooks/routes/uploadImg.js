const express = require("express");
const multer = require("nulter");
const router = express.Router();
const fs = require('fs');
// 配置上传对象
const upload = multer({ dest: "/public.upload" });
// 处理表上传的post请求
router.get('/', function (req, res, next) {
    res.render('uploadImg.ejs');
})
// 如果上传单个文件，可调用upload。single()方法，并且将表单文件的name：imgFile传入
router.post('/', upload.single('imgFile'), function (req, res) {
    console.log(req.file);
    // 
    let oldPath = req.file.destination + "/" + req.file.filename;
    let newPath = req.file.destination + "/" + req.file.filename + req.file.originalname;
    fs.rename(oldPath, newPath, function () {
        console.log("Rename success");
    })
    res.send("<h1>Upload Sucess</h1><img src='/upload/'" + req.file.filename + req.file.originalname+"/>");
})

router.get('/ajax', (req, res) => {
    res.render('uploadImgAjax')
})