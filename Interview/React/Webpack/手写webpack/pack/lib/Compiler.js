const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generator = require('@babel/generator').default;
const { log } = require('console');
// babylon 主要把源码转换为AST
// babel-traverse 遍历
// babel-types 代码替换AST
// babel-generator 生成代码
class Compiler {
    constructor(config) {
        // entry output
        this.config = config;
        // 需要保存入口文件的路径
        this.entryId; //./src/index.js
        //需要保存所有的模块依赖
        this.modules = {};
        // 入口路径
        this.entry = config.entry;
        // 工作路径
        this.root = process.cwd();
    }
    // 解析源码
    parse(source, parentPath) { //AST 解析语法书
        let ast = babylon.parse(source);
        let dependencies = [];
        traverse(ast, {
            CallExpression(p) {
                let node = p.node; //对应的节点
                // console.log(node);
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value; //取到的就是模块的引用名字
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName); //src/a.js
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        });
        let sourceCode = generator(ast).code;
        return { sourceCode, dependencies };
    }
    getSource(modulePath) {
        return fs.readFileSync(modulePath, 'utf8');
    }
    // 构建模块
    buildModule(modulePath, isEntry) {
        // 拿到模块内容
        let source = this.getSource(modulePath);
        // 模块ID modulePath = modulePath - this。root 相对路径
        let moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            this.entryId = moduleName; //保存主入口的名字
        }
        // 解析需要把source源码进行改造 返回一个依赖列表
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName)); // ./src

        // 把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode;

        dependencies.forEach(dep => { //副模块的加载 递归过程
            this.buildModule(path.join(this.root, dep), false);
        });
    }
    emitFile() {//发射文件

    }
    run() {
        // 执行并且创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        console.log(this.modules, this.entryId);
        // 发射文件 打包后的文件
        this.emitFile();
    }
}

module.exports = Compiler;