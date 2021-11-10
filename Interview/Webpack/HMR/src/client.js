
let socket = io('/')
// 在webpack / hot / dev - server.js会监听webpackHotUpdate事件
// 首先需要一个发布订阅去绑定事件并在合适的时机触发
class Emitter {
    constructor() {
        this.listeners = {}
    }
    on(type, listener) {
        this.listeners[type] = listener
    }
    emit(type) {
        this.listeners[type] && this.listeners[type]()
    }
}
let hotEmitter = new Emitter()
// 连接socket并接受消息s
const onConnected = () => {
    console.log('客户端连接成功')
}
let hotCurrentHash // lastHash 上一次 hash值 
let currentHash // 这一次的hash值
socket.on('hash', (hash) => {
    debugger
    currentHash = hash
})
// 客户端收到ok的消息后会执行reloadApp方法进行更新
socket.on('ok', () => {
    reloadApp(true)
})
hotEmitter.on('webpackHotUpdate', () => {
    debugger
    if (!hotCurrentHash || hotCurrentHash == currentHash) {
        return hotCurrentHash = currentHash
    }
    hotCheck()
})

function hotCheck() {
    hotDownloadManifest().then(update => {
        let chunkIds = Object.keys(update.c)
        chunkIds.forEach(chunkId => {
            hotDownloadUpdateChunk(chunkId)
        })
    })
}

function hotDownloadUpdateChunk(chunkId) {
    let script = document.createElement('script')
    script.charset = 'utf-8'
    // /main.xxxx.hot-update.js
    script.src = '/' + chunkId + "." + hotCurrentHash + ".hot-update.js"
    document.head.appendChild(script)
}
// 此方法用来去询问服务器到底这一次编译相对于上一次编译改变了哪些chunk?哪些模块?
function hotDownloadManifest() {
    return new Promise(function (resolve) {
        let request = new XMLHttpRequest()
        //hot-update.json文件里存放着从上一次编译到这一次编译 取到差异
        let requestPath = '/' + hotCurrentHash + ".hot-update.json"
        request.open('GET', requestPath, true)
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                let update = JSON.parse(request.responseText)
                resolve(update)
            }
        }
        request.send()
    })
}
// 当收到ok事件后，会重新刷新app
// reloadApp中判断是否支持热更新
function reloadApp(hot) {
    if (hot) { // 如果hot为true 走热更新的逻辑
        hotEmitter.emit('webpackHotUpdate')
    } else { // 如果不支持热更新，则直接重新加载
        window.location.reload()
    }
}
// 实现我们可以在业务代码中定义需要热更新的模块以及回调函数，将其存放在hot._acceptedDependencies中
window.hotCreateModule = function () {
    let hot = {
        _acceptedDependencies: {},
        dispose() {
            // 销毁老的元素
        },
        accept: function (deps, callback) {
            for (let i = 0; i < deps.length; i++) {
                // hot._acceptedDependencies={'./title': render}
                hot._acceptedDependencies[deps[i]] = callback
            }
        }
    }
    return hot
}
// 当客户端把最新的代码拉到浏览之后
window.webpackHotUpdate = function (chunkId, moreModules) {
    // 循环新拉来的模块
    for (let moduleId in moreModules) {
        // 从模块缓存中取到老的模块定义
        let oldModule = __webpack_require__.c[moduleId]
        // parents哪些模块引用这个模块 children这个模块引用了哪些模块
        // parents=['./src/index.js']
        let {
            parents,
            children
        } = oldModule
        // 更新缓存为最新代码 缓存进行更新
        let module = __webpack_require__.c[moduleId] = {
            i: moduleId,
            l: false,
            exports: {},
            parents,
            children,
            hot: window.hotCreateModule(moduleId)
        }
        moreModules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
        module.l = true // 状态变为加载就是给module.exports 赋值了
        parents.forEach(parent => {
            debugger // parents=['./src/index.js']
            let parentModule = __webpack_require__.c[parent]
            // _acceptedDependencies={'./src/title.js',render}
            parentModule && parentModule.hot && parentModule.hot._acceptedDependencies[moduleId] && parentModule.hot._acceptedDependencies[moduleId]()
        })
        hotCurrentHash = currentHash
    }
}
socket.on('connect', onConnected)