# 加速原理

当用户访问使用 CDN 服务的网站时，本地 DNS 服务器通过 CNAME 方式将最终域名请求重定向到 CDN 服务。CDN 通过一组预先定义好的策略(如内容类型、地理区域、网络负载状况等)，将当时能够最快响应用户的 CDN 节点 IP 地址提供给用户，使用户可以以最快的速度获得网站内容。

# 访问过程
1. 用户输入访问的域名,操作系统向 LocalDns 查询域名的 ip 地址.
2. LocalDns 向 ROOT DNS 查询域名的授权服务器（这里假设 LocalDns 缓存过期）
3. ROOT DNS 将域名授权 dns 记录回应给 LocalDns
4. LocalDns 得到域名的授权 dns 记录后,继续向域名授权 dns 查询域名的 ip 地址
5. 域名授权 dns 查询域名记录后（一般是 CNAME），回应给 LocalDns
6. LocalDns 得到域名记录后，向智能调度 DNS 查询域名的 ip 地址
7. 智能调度 DNS 根据一定的算法和策略（比如静态拓扑，容量等），将最适合的 CDN 节点 ip 地址回应给 LocalDns
8. L-ocalDns 将得到的域名 ip 地址，回应给 用户端
9. 用户得到域名 ip 地址后，访问站点服务器
10. CDN 节点服务器应答请求，将内容返回给客户端。（缓存服务器一方面在本地进行保存，以备以后使用，二方面把获取的数据返回给客户端，完成数据服务过程）

# CDN专用DNS服务器
用户使用某个域名来访问静态资源时（这个域名在阿里 CDN 服务中叫做“加速域名”），比如这个域名为“image.baidu.com”，它对应一个 CNAME，叫做“cdn.ali.com”，那么普通 DNS 服务器（区别 CDN 专用 DNS 服务器）在解析“image.baidu.com”时，会先解析成“cdn.ali.com”，普通 DNS 服务器发现该域名对应的也是一个 DNS 服务器，那么会将域名解析工作转交给该 DNS 服务器，该 DNS 服务器就是 CDN 专用 DNS 服务器。CDN 专用 DNS 服务器对“cdn.ali.com”进行解析，然后依据服务器上记录的所有 CDN

# CNAME 域名
接入 CDN 时，在 CDN 提供商控制台添加完加速域名后，您会得到一个 CDN 给您分配的 CNAME 域名， 您需要在您的 DNS 解析服务商添加 CNAME 记录，将自己的加速域名指向这个 CNAME 域名，这样该域名所有的请求才会都将转向 CDN 的节点，达到加速效果。




https://zhuanlan.zhihu.com/p/306069528
https://zhuanlan.zhihu.com/p/74552621
