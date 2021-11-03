
// loader 一般只能对源文件代码进行转换，而 plugin 可以做得更多
// plugin 在整个编译周期中都可以被调用，只要监听事件
// 在插件开发中最重要的两个资源就是 compiler 和 compilation 对象。
// 理解它们的角色是扩展 webpack 引擎重要的第一步。

// compiler 对象代表了完整的 webpack 环境配置。
// 这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。
// 当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。
// 可以使用它来访问 webpack 的主环境。


// compilation 对象代表了一次资源版本构建。
// 当运行 webpack 开发环境中间件时，
// 每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。
// 一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。
// compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。


// 作者：谭光志
// 链接：https://juejin.cn/post/6871239792558866440
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
// 此版本不适用于webpack5，webpack5需使用compiler.hooks实现
// 此插件可用于将 loader 处理后的打包文件 bundle.js 引入到 index.html 中
function Plugin(options) { }
Plugin.prototype.apply = function (compiler) {
    // 所有文件资源经过不同的loader处理后触发这个事件
    compiler.plugin('emit', function (compilation, callback) {
        // 获取打包后的JS文件名
        const filename = compiler.options.output.filename;
        // 生成一个index.html并引入打包后的JS文件
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="${filename}"></script>
</head>
<body>
    
</body>
</html>`;
        // 所有处理后的资源都放在compilation.assets中
        // 添加一个index.html文件
        compilation.assets['index.html'] = {
            source: function () {
                return html;
            },
            size: function () {
                return html.length;
            }
        };
        // 功能完成后调用webpack提供的回调函数
        callback();
    })
}
module.exports = Plugin;

// 插件使用
// const Plugin = require('./src/plugin');
// module.exports = {
//     plugins: [
//         new Plugin()
//     ]
// }