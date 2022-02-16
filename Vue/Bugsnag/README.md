# Bugsnag

`npm install --save @bugsnag/js @bugsnag/plugin-vue`

## 基础配置
<hr />

```
// ES 引入方式
import Bugsnag from "@bugsnag/js";
import BugsnagPlugin from "@bugsnag/plugin-vue";

// COMMONJS/Node 引入方式
const Bugsnag = require("@bugsnag/js");
const BugsnagPluginVue = require("@bugsnag/plugin-vue");
```
为了集成 `Vue` 和 `Bugsnag`，需要实例化 `BugsnagPluginVue` 并将其与你的 API 密钥一起作为配置传递给 `Bugsnag.start`：
```
Bugsnag.start({
  apiKey: "YOUR_API_KEY",
  plugins: [new BugsnagPluginVue()],
  otherOptions: value
})
```
在`Vue3`中，在创建 `Vue` 应用程序时，通过提供 `Bugsnag` Vue 插件来开始处理错误：

```
const bugsnageVue = Bugsnag.getPlugin("vue");
Vue.createApp(App)
  .use(bugSnagVue)
  .mount("#app")
```
在`Vue2`中，通过调用 `installVueErrorHandler` 为 `Bugsnag` Vue 插件而供 `Vue` 全局使用：
```
const bugsnag = Bugsnag.getPlugin("vue");
bugsnagVue.installVueErrorHanlder(Vue);
```
- 报告处理的错误
有时候通过手动通知 `Bugsnag` 报告的问题是必要的。 为此，需要调用 `Bugsnag.notify()`。 例如：
```
try{
  something.risky();
}catch(e){
  Bugsnag.notify(e)
}
```
报告处理错误时，发送自定义诊断数据或调整特定错误的严重性通常很有帮助。 有关详细信息，请参阅

- 区分用户
为了将错误与客户报告相关联，或着查看每个遇到的错误的用户列表，在 `Bugsnag` 仪表板上捕获和显示用户信息会很有帮助。

您可以在 `Bugsnag` 启动时使用用户配置属性或通过 `onError` 回调函数设置错误报告的用户信息。
```
Bugsnag.start({
  onError: function (event) {
    event.setUser("3", "bugs.nag@bugsnag.com", "Bugs Nag")
  }
})
```

## 自定义错误报告
<hr />

### 使用`callback`回调函数更新事件
如果你希望将诊断数据添加到报告中，或者说有条件的调整事件数据，你可以使用`onError`回调函数，这个回调函数会在一个错误被捕获或者被报告的时候运行：
```
Bug.start({
  onError: function(event){
    // 修正事件信息
    event.errors[0].errorClass = "com.example.BadClass";
    // 添加额外的诊断信息
    evetn.addMetadata("account", {
      type: "paid",
      betaAccess: true
    });
  }
})
```
回调函数可以让你访问`Event`对象，你可以检查并修改要被发送到`Bugsnag`的错误事件。

- 添加和去除回调函数 (`callbacks`)
我们建议通过 `onError` 配置选项添加回调，以确保在 `Bugsnag` 启动时立即注册。 但是，`Bugsnag`提供了以下方法以允许在应用程序运行时添加和删除回调：
```
const cb = function (event) {
  Bugsnag.addOnError(cb);
  // ...
  Bugsnag.removeOnError(cb);
}
```
### 丢弃事件
如果你想阻止一个事件被发送到`Bugsnag`，你可以在`onError`回调函数中返回`false`。这可以允许用户选择退出发送错误报告，如：
```
Bugsnag.start({
  onError: function (event) {
    return !userHasOptedOut()
  }
})
```
如果你用一个异步的回调函数来阻止一个事件被发送，你可以同样异步的通过`resolve(false)/cb(null, false)`（取决于函数的代码样式）返回`return false;`

### 异步`onError`回调函数

```
Bugsnag.start({
  onError: event => {
    new Promise((resolve, reject) => {
      // 做一些异步的work，在完成的时候resolve
      resolve();
      // 如果发生错误，你可以拒绝这个承诺，但这个错误不会
      // 阻止事件被发送（或其他回调被运行）
      reject(err);
      // 停止发送事件 resolve with false
      resolve(false);
    })
  }
})
```
```
Bugsnag.start({
  onError: (event, cb) => {
    // 做一些异步的 work，在完成的时候调用 `cb(err, ignore?)`
    cb(null)
    // 当调用cb(err)的时候导致了报错， 那么这个被发送的事件不会被阻止
    cb(err);
    // 阻止事件发送
    cb(null, false);
  }
})
```
```
Bugsnag.start({
  onError: async (event) => {
    // 做一些异步的 work
    await somethingAsync();
    // 你可以显式返回 true，或者根本不返回（隐式返回 undefined）
    return ture;
    // 停止发送事件 return false
    return false;
  }
});
```

### 全局元数据
如果您有适用于所有捕获事件的`元数据`，则可以在 `Bugsnag` 客户端上全局设置它，并将在所有后续生成的事件上设置它。 为了确保在 `Bugsnag` 开始捕获事件时事件包含元数据，请将其添加到配置对象的元数据字段中。

地图中的顶级键在 `Bugsnag` 仪表板中显示为选项卡：
```
Bugsnag.start({
  metadata: {
    company: {
      name: {
        name: "Acme Co.",
        country: "uk"
      }
    }
  }
})
```
元数据也可以在您的应用程序运行时使用 `Bugsnag` 客户端上的 `addMetadata` 和 `clearMetadata` 进行管理：
```
Bugsnag.addMetadata("company", {
  name: "Acme Co.",
  country: "uk"
})
// ...
Bugsnag.clearMetadata("company");
```

### 添加用户数据
通过在配置中设置用户ID，email和姓名，当启动`configuration`时，被产生错误所影响的用户的相关信息可以被添加到实践中并发送到你的`Bugsnag`的展版。
```
Bugsnag.start({
  user: {
    id: "3",
    name: "Bug Nag",
    email: "bugs.nag@bugsnag.com"
  }
})
```
在浏览器中，或者在您的进程只为单个用户服务的其他环境中（例如 `Node.js` 中的 `CLI` 应用程序），您可以在 `Bugsnag` 启动后直接在 `Bugsnag` 实例上附加用户数据（例如，当 用户登录）。 然后，这将与所有后续错误一起发送。
`Bugsnag.setUsers("3", "bugs.nag@bugsnag.com", "Bugs Nag")`
你也可以通过`onError`回调函数对每一个事件设置用户
```
Bugsnag.start({
  onError: function(event){
    event.setUser("3", "bug.snag@bugsnag.com", "Bugs Nag")
  }
})
```

### 设置上下文
`Bugsnag` 使用“上下文(context)”的概念来帮助显示和分组您的错误。 上下文表示发生错误时应用程序中发生的情况，并在仪表板中具有很高的视觉突出性。

默认情况下，在浏览器中，`Bugsnag` 将每个事件的上下文设置为 `window.location.pathname`。 如果你想手动设置这个值，你可以在 `Bugsnag` 启动时在 `Configuration` 中设置它：

`Bugsnag.start({context: 'ctx-id-1234'})`
然后可以在 `Bugsnag` 客户端上修改上下文作为/当它为所有后续事件更改时：
`Bugsnag.setContext("User setting screen")`
或者，可以使用 `onError` 回调为每个事件修改上下文：
```
Bugsnag.start({
  onError: function(event){
    event.context = "User settings screen"
  }
})
```

### 阻止 IP 地址收集
默认情况下会收集客户端的 `IP` 地址，并在仪表板上的用户标识符和请求选项卡中使用。 这可以通过设置 `collectUserIp: false` 选项来防止。

请注意，如果不收集 `IP`，除非指定了用户 `ID`，否则报告似乎都来自同一用户。 我们强烈建议您提供用户 `ID`，以便您可以根据受影响的用户数量确定错误的优先级。 `Fingerprintjs` 等库可用于创建匿名、唯一但可重现的标识符。

要防止 `IP` 收集但设置用户 `ID`：
```
Bugsnag.start({
  collectUserIp: false,
  onError: function(event){
    // 一个自定义的用户解析器
    var userId = getMyUserIdentifier();
    event.setUser(userId);
  }
})
```
当配置`Bugsnag`的时候，如果用户`Id`的值是已知的，你可以直接设置`user`：
```
Bugsnag.start({
  collectUserIp: false,
  user:: {id: "1234"}
})
```

### 事件对象
[具体链接🔗](https://docs.bugsnag.com/platforms/javascript/vue/customizing-error-reports/#global-metadata)

