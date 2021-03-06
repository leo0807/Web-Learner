# 什么是HTTPS
HTTPS是在**HTTP上建立SSL加密层**，并对传输数据进行加密，是HTTP协议的安全版。现在它被广泛用于万维网上安全敏感的通讯，例如交易支付方面。
## HTTPS主要作用是：
- 对数据进行加密，并建立一个信息安全通道，来保证传输过程中的数据安全;
- 对网站服务器进行真实身份认证。

# 为什么需要HTTPS
在HTTP协议中有可能存在**信息窃取或身份伪装**等安全问题。使用HTTPS通信机制可以有效地防止这些问题，接下来，我们先来了解下HTTP协议存在的哪些问题：
    
- 通信使用明文**不加密**，内容可能被**窃听**
    
由于HTTP本身不具备加密的功能，所以也无法做到对通信整体（**使用HTTP协议通信的请求和响应的内容**）进行加密。即，HTTP报文使用**明文**（指未经过加密的报文）方式发送。

HTTP明文协议的缺陷是导致**数据泄露、数据篡改、流量劫持、钓鱼攻击**等安全问题的重要原因。HTTP协议无法加密数据，所有通信数据都在网络中明文“裸奔”。通过网络的嗅探设备及一些技术手段，就可还原HTTP报文内容。
    
- 无法证明报文的**完整性**，所以可能遭**篡改**
    
**所谓完整性是指信息的准确度**。若无法证明其完整性，通常也就意味着无法判断信息是否准确。由于HTTP协议无法证明通信的报文完整性，因此，在请求或响应送出之后直到对方接收之前的这段时间内，即使请求或响应的内容遭到篡改，也没有办法获悉。换句话说，**没有任何办法确认，发出的请求/响应和接收到的请求/响应是前后相同的**。
    
- 不验证通信方的身份，因此有可能遭遇**伪装**
    
**HTTP协议中的请求和响应不会对通信方进行确认**。在HTTP协议通信时，由于不存在确认通信方的处理步骤，任何人都可以发起请求。另外，服务器只要接收到请求，不管对方是谁都会返回一个响应（但也仅限于发送端的IP地址和端口号没有被Web服务器设定限制访问的前提下）
HTTP协议无法验证通信方身份，任何人都可以伪造虚假服务器欺骗用户，实现“钓鱼欺诈”，用户无法察觉。
反观HTTPS协议，它比HTTP协议相比多了以下优势（下文会详细介绍）:
    
- 数据隐私性：内容经过对称加密，每个连接生成一个唯一的加密密钥
- 数据完整性：内容传输经过完整性校验
- 身份认证：第三方无法伪造服务端（客户端）身份


## 非对称加密
非对称加密的特点是**信息传输一对多**，服务器只需要维持一个私钥就能够和多个客户端进行加密通信。
RSA ECC DH
## 非对称加密缺点
- 公钥是公开的，所以针对私钥加密的信息，黑客截获后可以使用公钥进行解密，获取其中的内容；
- 公钥并不包含**服务器**的信息，使用非对称加密算法无法确保服务器身份的合法性，存在中间人攻击的风险，
服务器发送给客户端的公钥可能在传送过程中被中间人截获并篡改；
- 使用非对称加密在数据加密解密过程需要消耗一定时间，降低了数据传输效率；

## 数字签名 解决数据被篡改的问题
网络传输过程中需要经过很多中间节点，虽然数据无法被解密，但可能被篡改，那如何校验数据的完整性呢？—-校验数字签名。
数字签名有两种功效：
- 能确定消息确实是由发送方签名并发出来的，因为别人假冒不了发送方的签名。
- 数字签名能确定消息的完整性，证明数据是否未被篡改过

将一段文本先用 Hash 函数生成消息摘要，然后用发送者的私钥加密生成数字签名，与原文文一起传送给接收者。接下来就是接收者校验数字签名的流程了
接收者只有用**发送者的公钥**才能解密被加密的摘要信息，然后用 HASH 函数对收到的原文产生一个摘要信息，与上一步得到的摘要信息对比。如果相同，则说明收到的信息是完整的，在传输过程中没有被修改，否则说明信息被修改过，因此数字签名能够验证信息的完整性。

## 解决通信方身份可能被伪装的问题——数字证书
服务器的运营人员向数字证书认证机构提出公开密钥的申请
数字证书认证机构在判明提出申请者的身份之后，会对已申请的公开密钥做数字签名
然后分配这个已签名的公开密钥，并将该公开密钥放入公钥证书后绑定在一起
服务器会将这份由数字证书认证机构颁发的公钥证书发送给客户端，以进行非对称加密方式通信。公钥证书也可叫做数字证书或直接称为证书。

##HTTP 与 HTTPS 的区别
- HTTP 是明文传输协议，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。  
- HTTPS 比 HTTP 更加安全，对搜索引擎更友好，利于 SEO，谷歌、百度优先索引 HTTPS 网页;
- HTTPS 需要用到 SSL 证书，而 HTTP 不用;
- HTTPS 标准端口 443，HTTP 标准端口 80;
- HTTPS 基于传输层，HTTP 基于应用层;
- HTTPS 在浏览器显示绿色安全锁，HTTP 没有显示;
  
## 为何不所有的网站都使用 HTTPS
权威 CA 颁发的 SSL 证书。从证书的选择、购买到部署，传统的模式下都会比较耗时耗力

信息窃听，信息篡改，信息劫持
信息加密，完整性校验，身份验证

作者：Fundebug
链接：https://juejin.cn/post/6844903830987997197
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。