正如你可能知道的，**script标签**是用来指定在网页上执行哪个 JavaScript 的。Script 标签可以直接包含 JavaScript 代码，或者指向一个 JavaScript 外链 URL。

Script 标签按照它们出现的顺序被执行
下面的代码很直观地说明了这一点：
```
<script>
  var x = 3;
</script>
<script>
  alert(x);
  // Will alert "3";
</script>
```
使用外链资源时加载次序没有那么直观，但依然是成立的：
```
<script src="//typekit.com/fj3j1j2.js"></script>

<!-- This second script won’t execute until typekit has executed, or timed out -->
<script src="//my.site/script.js"></script>
```
如果你混合使用外链和内联的 JavaScript，这个规则同样适用。

这意味着如果你的网站有很慢的脚本在页面较前部分(比如在head标签加载)被加载，你的网页加载就会被显著拖慢。这也意味着**后加载的脚本可以依赖先加载的脚本**。

页面元素在它之前的所有脚本都加载完毕之前是不会执行渲染的。这意味着你可以你可以在页面加载之前在网页上做各种疯狂的事情，当然前提是你不在意因此而造成的性能问题。

用户必须忍受这种可以察觉的延迟。浏览器在遇到< body>标签之前，不会渲染页面的任何部分。用这种方法把脚本放在页面的顶端，将导致一个可以察觉的延迟，通常表现为：页面打开时，首先显示为一幅空白的页面，而此时用户即不能阅读，也不能与页面进行交互操作

虽然随着浏览器的发展，Internet Explorer 8, Firefox 3.5, Safari 4, 和 Chrome 2 允许并行下载 JavaScript 文件。这表明，当一个< script>标签正在下载外部资源时，不必阻塞其他< script>标签。不幸的是，JavaScript 的下载仍然要阻塞其他资源的下载过程，例如图片。即使脚本之间的下载过程互不阻塞，页面仍旧要等待所有 JavaScript代码下载并执行完成之后才能继续。所以，当浏览器通过允许并行下载提高性能之后，该问题并没有完全解决。脚本阻塞仍旧是一个问题。脚本阻塞其他页面资源的下载过程，所以推荐的办法是：将所有< script>标签放在尽可能接近< body>标签底部的位置，尽量减少对整个页面下载的影响

由于每个 HTTP 请求都会产生额外的性能负担，下载一个 100KB 的文件比下载四个 25KB 的文件要快。当一个大型网站或网页应用需要多次请求 JavaScript 文件。可以将这些文件整合成一个文件，只需要一个< script>标签引用，就可以减少性能损失。

然而这个规则不适用于你在网页加载完成之后通过 document.appendChild 之类的方法添加 script 标签到 DOM 中。这些标签会根据浏览器请求处理完成的先后执行脚本，不再保证加载顺序。

当一个 script 标签被执行，在它之前的 HTML 元素可以访问（但是在它之后的还不能用）
```
<html>
  <head>
    <script>
      // document.head is available
      // document.body is not!
    </script>
  </head>
  <body>
    <script>
      // document.head is available
      // document.body is available
    </script>
  </body>
</html>
```
你可以想象 HTML 解析器一个标签一个标签地访问文档，当它解析到 script 标签时，马上执行其中的 JavaScript。这意味着只有当开始标签出现在当前脚本之前的 DOM 节点才可以在当前 JavaScript 中被访问（通过 querySelectorALl，jQuery 等等）。

一个有用的推论是 document.head 在任何写在网页上的 JavaScript 几乎总是可用。document.body 只有当你将 script 标签写在 <body> 标签中或者它之后的时候才可用。

### async 和 defer
HTML5 添加了两个工具来控制脚本的执行。

- **async**表示“不用马上执行它”。更具体地它表示：我不介意你在整个网页加载完成之后执行这个脚本，把它放在其他脚本执行之后。这对于统计分析脚本来说非常有用，因为页面上没有其他的代码需要依赖于统计脚本执行。定义一个页面需要的变量或函数在 async 的代码中是不行的，因为你没有方法知道什么时候 async 代码将会被实际执行。

- **defer**表示“等待页面解析完成之后执行”。它大致等价于将你的脚本绑定到 DOMContentedLoaded 事件，或者使用 jQuery.ready。当这个代码被执行，DOM 中的一切元素都可用。不同于 async，所有加了 defer 的脚本将会按照它们出现在 HTML 页面中的顺序执行，它只是推迟到 HTML 页面解析完毕后开始执行。

- async用于异步加载脚本，与defer的区别是：async加载完成后自动执行，defer需要等到页面完成后（window.onload）才执行， 注意：多个标记为 async 的脚本并不保证按照指定它们的先后顺序执行（有可能是file3.js, file2.js, file4.js,取决于谁先返回），因为他们是异步加载的

- async和defer在网络下载的情况下，都是异步的，区别在于下载完之后何时开始执行脚本；
- async是乱序执行的，当脚本下载完毕会被立刻执行；而defer一般是顺序执行的，在文档加载和解析完成之后，即在DOMContentLoaded之前执行的
![image](https://github.com/leo0807/Web-Learner/blob/master/images/script.png)
**所以操作 DOM 的脚本最好不要使用 async / defer**

###### type 属性
从历史上看（自 Netsacpe 2 诞生起），在 script 标签上是否写上 type=text/javascript 没有什么关系。如果你通过 type 设置一个非 JavaScript 的 MIME 类型，浏览器不会执行它。当你想要定义你自己的语言时，这会很酷：
```
<script type="text/emerald">
  make a social network
    but for cats
</script>
```
这段代码实际执行结果由你自己决定，例如：
```
<script>
  var codez = document.querySelectorAll("script[type="text/emerald"]");
  for (var i=0; i < codez.length; i++)
    runEmeraldCode(codez[i].innerHTML);
</script>
```
定义 runEmeraldCode 函数留给你们作为练习。

如果你有特别的需要，你也可以重写页面上 script 标签的默认 type，方法是通过一个 meta 标签：

```<meta http-equiv="Content-Script-Type" content="text/vbscript">```
或者一个请求返回一个 Content-Script-Type header。

可以读一下 Web 上奇怪的脚本语言的一个简短历史这篇文章有关于 type 用法的更详细信息。

###### 用 integrity 属性？
integrity 属性是子资源完整性新规范的一部分。它允许你为脚本文件将包含的内容内容提供一个 hash。这意味着可以防止在传输的时候内容丢失或者被恶意修改。就算使用了 SSL，这个规范也是有意义的，因为有时候你要加载的资源是你无法控制的站外资源，比如 code.jquery.com。

如果你选择使用它，你要在 script 标签里包含一个 hash 类型以及 hash 值，将它们以连字符隔开。看起来类似下面这样：
```
<script
  src="//code.jquery.com/jquery.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC">
</script>
```
我还没有看到有人用了它，然而如果你知道有哪个网站用了，可以在下面评论。

###### crossorigin
虽然还没有完全被标准化，但是一些浏览器支持 crossorigin 属性。基本的想法是，浏览器会限制对非同源资源的使用（同源资源是指相同的协议、hostname 以及端口，例如： `http://google.com:80）。

这是为了防止你，例如，向你的竞争对手网站发请求，注销你的用户在对方网站的账号（这不好！）。这个问题牵扯到 script 标签虽然有点意外，但如果实现了 crossorigin，你只要加一个 handler 到 window.onerror 事件上，就能在看控制台上看到一些警告信息，提示你引入了一个不该引入的外站脚本。在安全的浏览器下，除非你指定 crossorigin 属性，不然加载外站脚本不会出错。

crossorgin 不是一个神奇的安全手段，它所做的只是让浏览器启用正常的 CORS 访问检查，发起一个 OPTIONS 请求并检查 Access-Control header。

document.currentScript
IE 不支持的一个新奇的东西是个叫做 document.currentScript 的属性。它指向当前正在被执行的脚本。如果你想要从你嵌入的 script 标签中拿一些属性来用，它会非常有用。我个人非常高兴它还没有被完全支持，否则它会让我们在一部分工作中渴望嵌入更复杂的代码。

###### onafterscriptexecute
这个超没用，因为它只被 Firefox 支持。使用 onbeforescriptexecute 能让你绑定事件到每一个脚本的执行前和执行后，这很酷。

如果你对这个感到好奇，你可以研究下。event 对象包含一个被执行的脚本的引用，而 before 事件能通过 perventDefault() 取消脚本的执行。

###### for / event
到今天， HTML5 规范包含了一个很少见的，以前是 IE 特殊的方法来绑一段代码到一个事件。你应该能向下面这样让一段代码不被执行直到页面加载完成：
```
<script for="window" event="onload">
  alert("Hi!")
</script>
```
这段代码在 Chrome 或者 Firefox 下不能实际工作，但是它依然能够在 IE 下工作。

NOSCRIPT
如同你父母一样，很难相信 JavaScript 也曾经年少过。曾经有过这样一段时间你不能确定是否一个浏览器支持 JavaScript。更糟的是，你甚至不能确定那个浏览器能识别 script 标签。而如果一个浏览器不能识别标签，它应该会将它渲染成一个 inline 元素，意味着你所有 JavaScript 代码会被作为文本渲染在页面上！

幸运地是，规范已经能足够有效地避免这个情况发生，你只需要将你的代码包在 HTML 注释里，那些不支持脚本的浏览器会把下面的文本当做注释：
```
<script>
<!--  to hide script contents from old browsers

  // You would probably be pasting a ‘rollover’ script
  // you got from hotscripts.net here

// end hiding contents from old browsers  -->
</script>
```
当然，像很多事情一样，XHTML将这变得更糟。XML用特殊的方法来转义可能包含结束标签的内容，这是 CDATA 的来历：
```
<script>
//<![CDATA[

    // Is this the right incantation to get this to pass
    // the XHTML validator?

//]]>
</script>
```
像上面这样写，你的代码可以是一个规范的 XHTML。它对实际功能没有什么影响，但是它对你作为一个 Web 开发者的荣誉也许很重要（现在这个时代，谁还用 XHTML 啊——译者注）。

浏览器也包含一个有用的方法来让你把那些不支持 JavaScript 人赶走，通过 noscript 标签。<noscript> 标签里的内容只有浏览器不支持脚本的时候才会被渲染出来：
```
<noscript>
  Please use Internet Explorer 5.5 or above.
</noscript>
<script>
  exploitInternetExplorer0Day();
</script>
```
如果你有敏锐的观察力，你会意识到 noscript 不接受 type 参数，这使得那些使用别的 type 类型的脚本的页面上如果出现 noscript 会显得有点歧义。noscript 实际行为在各个浏览器下有所不同。

###### Script 标签和 innerHTML
通过 DOM 动态添加到页面上的 script 标签会被浏览器执行：
```
var myScript = document.createElement("script");
myScript.textContent = "alert("✋")";
document.head.appendChild(myScript);
```
###### 通过 innerHTML 动态添加到页面上的 script 标签则不会被执行：
document.head.innerHTML += "<script>alert("✋")</script>";
为什么会是这样的原因不是很确定，但是它解决了一个小问题：“是否有一个办法让一个 script 标签在 Chrome 代码检查器中显示但不实际执行？”你可以利用这个来对你的同事做恶作剧。


###script标签是如何加载的？
当浏览器遇到一个```<script>```标签时，浏览器会停下来，运行JavaScript代码，然后再继续解析、翻译页面。同样的事情发生在使用 src 属性加载 JavaScript 的过程中。浏览器必须首先下载外部文件的代码，需要占用一些时间，然后解析并运行此JavaScript代码。此过程中，页面解析和用户交互是被完全阻塞的。