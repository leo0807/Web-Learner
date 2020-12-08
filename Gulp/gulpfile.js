// gulpfile 是固定名称用来编辑任务
// gulp使用CommonJS规范
// 此文件在控制台console中运行

const gulp = require('gulp');

// 第一个参数为任务名称，第二个参数为回掉函数，任务执行对功能
gulp.task("hello", function () {
    console.log('Hello World');
})

gulp.src() //找到源文件路径
gulp.dest() // 找到目的文件路径，如不存在则自动创建
pipe() //程序运行管道

// 拷贝文件 整理HTML文件
// 命令行 使用gulp 对应的任务名以运行相对应的任务 如 gulp copy-html
gulp.task("copy-html", function () {
    return gulp.src("index.html").pipe(gulp.dest("dist/"))
})
// 拷贝图片
gulp.task("images", function () {
    // 将img文件夹内外的所有图片全部整理到 dist/images
    return gulp.src("img/**/*").pipe(gulp.dest("dist/images"))
    // 将后缀名为jpg和png的进行整理
    // return gulp.src("img/*.{jpg, png}").pipe(gulp.dest("dist/images"))
    // 将img文件夹下的子文件中的图片也取出来
    // return gulp.src("img/*/*").pipe(gulp.dest("dist/images"))
})

// 拷贝多个文件到一个文件夹
// ！符号代表剔除该种匹配选项
gulp.task("data", function () {
    return gulp.src(["json/*.json", "xml/*.xml", "!xml/04.xml"]).pipe(gulp.dest("dist/"))
})
// 一次性执行多个任务
gulp.task("build", ["copy-html", "images", "data"], function () {
    console.log("Successful");
})

// 监听事件 如果监听文件发生变化 会自动去执行相对应的任务 更新数据
gulp.task("watch", function () {
    // 第一个参数 是文件监听的路径
    // 第二个参数 要执行的任务 必须是数组
    gulp.watch("index.html", ["copy-html"]);
    gulp.watch("img/**/*", ["images"]);
    gulp.watch("json/*.json", ["data"]);
    gulp.watch("./index.scss", ["sass"]);
    gulp.watch("./js/*.js", ["scripts"]);
})

// 给gulp添加插件
const sass = require("gulp-sass");
gulp.task("sass", function () {
    // 此插件可以编译.scss文件
    return gulp.src("./index.scss").
        pipe(sass()).
        pipe(gulp.dest("dist/csss")).
        pipe(minifyCSS()).
        pipe(rename("index.min.css")).
        pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

// 压缩css插件
const minifyCSS = require("gulp-minify-css");



// 重命名插件 用于文件被压缩之后的二次开发 恢复之前文件的状态
const rename = require("gulp-rename");
// 合并JS文件的插件
const concat = require("gulp-concat"); 
// js压缩
const uglify = require("gulp-uglify");
gulp.task("scripts", function () {
    return gulp.src("./js/*.js").
        pipe(concat("./index.js")).
        pipe(gulp.dest("./dist/javscript")).
        pipe(uglify()).
        pipe(rename("index.min.js")).
        pipe(gulp.dest("./dist/javscript"))
        .pipe(connect.reload())
})

// gulp-connect 服务器

const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "dist", //设置根目录
        port: 8888,
        livereload: true //实时刷新
    })
})

// 同时启动监听和服务 default 只需要在控制台敲 gulp 即可

gulp.task("default", ["watch", "server"])