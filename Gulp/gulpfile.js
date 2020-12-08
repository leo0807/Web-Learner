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

// 