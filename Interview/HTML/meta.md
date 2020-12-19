一、meta标签的定义

meta标签是head部的一个辅助性标签，提供关于 HTML 文档的元数据。它并不会显示在页面上，但对于机器是可读的。可用于浏览器（如何显示内容或重新加载页面），搜索引擎（SEO），或其他 web 服务。

二、meta标签的作用

**meta标签里的数据是供机器解读的，其主要作用有：搜索引擎优化（SEO），定义页面使用语言，自动刷新并指向新的页面，实现网页转换时的动态效果，控制页面缓冲，网页定级评价，控制网页显示的窗口等等。**

三、meta标签的可选属性

在W3school中，对于meta标签的可选属性提到了三个，分别是**http-equiv、name和scheme**，新近又出了一个**property**属性，下面我们一个个介绍：

1、http-equiv属性

http-equiv属性是添加http头部内容，对一些自定义的或者需要额外添加的发送到浏览器中的http头部内容，我们就可以是使用这个属性。

http-equiv属性语法格式：

1
<meta http-equiv="参数" content="具体的参数值">
name属性主要有以下几种参数：

a、charset

说明：用以说明网页制作所使用的文字以及语言。

用法：

1
<meta http-equiv="charset" content="iso-8859-1">
b、expires

说明：设置网页的过期时间，一旦过期则必须到服务器上重新获取。需要注意的是必须使用GMT时间格式

用法：

1
<meta http-equiv="expires" content="31 Dec 2018">
c、refresh

说明：用于设定网页在特定时间内自动刷新并转到新页面

用法：

1
<meta http-equiv="refresh" contect="5;url=https://www.deannhan.cn">
d、pragma

说明：用于设定禁止浏览器从本地计算机的缓存中访问页面内容。

用法：

1
<meta http-equiv="pragma" contect="no-cache">
e、windows-target

说明：用于设定强制页面在窗口中以独立页面显示，防止自己的网页被别人当作一个frame页调用。

用法：

1
<meta http-equiv="windows-target" contect="_top">
f、set-cookie

说明：用于设定一个自定义cookie，如果网页过期，那么存盘的cookie将被删除，注意必须使用GMT的时间格式。

用法：

1
<meta http-equiv="Set-Cookie" content="name=deanhan; expires=Friday,12-Jan-2018 18:18:18 GMT; path=/">
g、content-Type

说明：用于设定页面使用的字符集。

用法：

1
<meta http-equiv="content-Type" content="text/html; charset=utf-8">
h、page-enter，page-exit

说明：用于设定页面进入和离开时的过渡效果，注意被添加的页面不能在一个frame中。

用法：

1
2
<meta http-equiv="page-enter" contect="revealTrans(duration=10,transtion=23)">
<meta http-equiv="page-exit" contect="revealTrans(duration=20，transtion=6)">
其中duration表示滤镜特效的持续时间（单位：秒），transition是滤镜类型，表示使用哪种特效，取值为0-23:

0 矩形缩小

1 矩形扩大

2 圆形缩小

3 圆形扩大

4 下到上刷新

5 上到下刷新

6 左到右刷新

7 右到左刷新

8 竖百叶窗

9 横百叶窗

10 错位横百叶窗

11 错位竖百叶窗

12 点扩散

13 左右到中间刷新

14 中间到左右刷新

15 中间到上下

16 上下到中间

17 右下到左上

18 右上到左下

19 左上到右下

20 左下到右上

21 横条

22 竖条

23 以上22种随机选择一种

2、name属性

name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

name属性语法格式：

1
<meta name="参数" content="具体的参数值">
name属性主要有以下几种参数：

a、keywords

说明：keywords用来告诉搜索引擎你网页的关键字是什么。

用法：

1
<meta name="keywords" content="逐梦博客,个人博客,个人网站">
b、description

说明：description用来告诉搜索引擎你的网站主要内容。

用法：

1
<meta name="description" content="逐梦博客，是一个记录博主学习和成长的个人纪实博客，主要关注web前端及周边技术的学习和研究。">
c、robots

说明：robots用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。

content的参数有all,none,index,noindex,follow,nofollow。默认是all。

用法：

1
<meta name="robots" content="none">
其中content具体参数如下：

1) all：文件将被检索，且页面上的链接可以被查询

2) none：文件将不被检索，且页面上的链接不可以被查询

3) index：文件将被检索

4) follow：页面上的链接可以被查询

5) noindex：文件将不被检索，但页面上的链接可以被查询

6) nofollow：文件将被检索，但页面上的链接不可以被查询

d、author

说明：author标注网页的作者

用法：

1
<meta name="author" content="826554003@qq.com">
e、generator

说明：generator用于说明网站的采用的什么软件制作。

用法：

1
<meta name="generator" content="Sublime"/>
f、copyright

说明：generator用于说明网站版权信息。

用法：

1
<meta name="copyright" content="xxx">
g、viewport

说明：viewport用于说明移动端网站的宽高缩放比例等信息

用法：

1
<meta name="viewport" content="width=device-width, initial-scale=1.0">
其中content的距离参数如下：

1) width 宽度(数值/device-width)

2) height 高度(数值/device-height)

3) initial-scale 初始缩放比例

4) maximum-scale 最大缩放比例

5) minimum-scale 最小缩放比例

6) user-scalable 是否允许用户缩放(yes/no)

f、renderer

说明：用于告诉浏览器使用什么内核进行解析

用法：

1
<meta name="renderer" content="webkit">
3、scheme

说明：用于指定要用来翻译属性值的方案。此方案应该在由 标签的 profile 属性指定的概况文件中进行了定义。

用法：

1
<meta scheme="ISBN" name="identifier" content="0-14-XXXXXX-1" >
4、property="og"

说明：og是一种新的HTTP头部标记，即Open Graph Protocol，这种协议可以让网页成为一个“富媒体对象"。用了property=og标签，就是你同意了网页内容可以被其他社会化网站引用等，目前这种协议被SNS网站如Fackbook、renren采用。
SNS已经成为网络上的一大热门应用，优质的内容通过分享在好友间迅速传播。为了提高站外内容的传播效率，2010年F8会议上Facebook公布 了一套开放内容协议(Open Graph Protocol)，任何网页只要遵守该协议，SNS就能从页面上提取最有效的信息并呈现给用户。

用法：

1
2
3
4
5
<meta property="og:type" content="video/website/article"/>
<meta property="og:title" content="逐梦博客"/>
<meta property="og:description" content="逐梦博客，是一个记录博主学习和成长的个人纪实博客，主要关注web前端及周边技术的学习和研究。"/>
<meta property="og:image" content="https://www.deanhan.cn/wp-content/uploads/2017/09/logo.png″/>
<meta property="og:url" content="https://www.deanhan.cn/"/>
最后列出一些比较常见的用法：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
<!-- 设定字符集 -->
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
 
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords">
 
<!-- 页面描述内容 description -->
<meta name="description" content="your description">
 
<!-- 定义网页作者 author -->
<meta name="author" content="author,email address">
 
<!-- 定义网页搜索引擎索引方式，robotterms 是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。 -->
<meta name="robots" content="index,follow">
 
<!-- 优先使用最新的chrome版本 -->
<meta http-equiv="X-UA-Compatible" content="chrome=1" />
 
<!-- 禁止自动翻译 -->
<meta name="google" value="notranslate">
 
<!-- 禁止转码 -->
<meta http-equiv="Cache-Control" content="no-transform">
 
<!-- 选择使用的浏览器解析内核 -->
<meta name="renderer" content="webkit|ie-comp|ie-stand">
 
<!-- 移动端 -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection"content="telephone=no, email=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" /><!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" /><!-- 设置苹果工具栏颜色 -->
<meta name="format-detection" content="telphone=no, email=no" /><!-- 忽略页面中的数字识别为电话，忽略email识别 -->
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
<!-- 适应移动端end -->