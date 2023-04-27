# DNS (Doman Name System)
域名系统（`Domain Name System`）是整个互联网的电话簿，它能够将可被人理解的域名翻译成可被机器理解 `IP` 地址，使得互联网的使用者不再需要直接接触很难阅读和理解的 `IP` 地址。

域名系统在现在的互联网中非常重要，因为服务器的 IP 地址可能会经常变动，如果没有了 DNS，那么可能 IP 地址一旦发生了更改，当前服务器的客户端就没有办法连接到目标的服务器了，如果我们为 IP 地址提供一个『别名』并在其发生变动时修改别名和 IP 地址的关系，那么我们就可以保证集群对外提供的服务能够相对稳定地被其他客户端访问。

### 造成DNS变化的可能原因
- `DHCP` 服务器：在某些网络环境下，服务器的`IP`地址是由`DHCP`服务器`动态分配`的，当网络拓扑结构发生变化时，DHCP服务器会重新分配IP地址，导致服务器`IP`地址变动。
- `NAT`：在网络地址转换（`NAT`）环境中，服务器的`IP`地址会被转换为`公网IP`地址，当`NAT`设备重新分配`IP`地址时，服务器的`IP`地址也会发生变化。
- `动态DNS`：有些服务器会使用动态DNS（`DDNS`）服务，这种服务可以根据服务器的IP地址变化`自动更新`DNS记录，但是当IP地址发生变化时，服务器的IP地址也会随之变动。
- `服务器维护`：服务器维护可能会导致服务器IP地址变动。例如，当管理员对服务器进行系统升级、软件更新或者更换硬件时，服务器的IP地址可能会发生变化。
- `网络故障`：网络故障也可能导致服务器IP地址变动。例如，当网络设备故障时，管理员可能需要更换设备，重新配置网络拓扑结构，从而导致服务器IP地址变动。

## 工作原理
作为用户访问互联网的第一站，当一台主机想要通过域名访问某个服务的内容时，需要先通过当前域名获取对应的 IP 地址。这时就需要通过一个 DNS 解析器负责域名的解析，下面的图片展示了 DNS 查询的执行过程：
![工作原理](https://img.draveness.me/2018-11-07-dns-resolution.png)

1. 本地的`DNS`客户端向`DNS`解析器发出解析`draveness.me`域名的请求；
2. `DNS`解析器首先会向就近的根 `DNS` 服务器 . 请求顶级域名`DNS`服务的地址；
3. 拿到顶级域名 `DNS` 服务 `me.` 的地址之后会向顶级域名服务请求负责 `dravenss.me.` 域名解析的命名服务；
4. 得到授权的 `DNS` 命名服务时，就可以根据请求的具体的主机记录直接向该服务请求域名对应的 `IP` 地址；
`DNS`客户端接受到`IP`地址之后，整个`DNS`解析的过程就结束了，客户端接下来就会通过当前的`IP `地址直接向服务器发送请求。

对于 DNS 解析器，这里使用的 DNS 查询方式是迭代查询，每个 DNS 服务并不会直接返回 DNS 信息，而是会返回另一台 DNS 服务器的位置，由客户端依次询问不同级别的 DNS 服务直到查询得到了预期的结果；另一种查询方式叫做递归查询，也就是 DNS 服务器收到客户端的请求之后会直接返回准确的结果，如果当前服务器没有存储 DNS 信息，就会访问其他的服务器并将结果返回给客户端。
## 域名层级
域名层级是一个层级的`树形`结构，树的最顶层是`根域名`，一般使用 . 来表示，这篇文章所在的域名一般写作`draveness.me`，但是这里的写法其实省略了最后的 `.`，也就是全称域名（`FQDN`）dravenss.me.。
![DNS Name Space](https://img.draveness.me/2018-11-07-dns-namespace.png)
根域名下面的就是 `com`、`net` 和 `me` 等顶级域名以及次级域名 `draveness.me`，我们一般在各个域名网站中购买和使用的都是次级域名、子域名和主机名了。

## 域名服务器
既然域名的命名空间是树形的，那么用于处理域名解析的 DNS 服务器也是树形的，只是在树的组织和每一层的职责上有一些不同。DNS 解析器从根域名服务器查找到顶级域名服务器的 IP 地址，又从顶级域名服务器查找到权威域名服务器的 IP 地址，最终从权威域名服务器查出了对应服务的 IP 地址。
`$ dig -t A draveness.me +trace`
我们可以使用 `dig` 命令追踪 `draveness.me` 域名对应 `IP` 地址是如何被解析出来的，首先会向预置的 `13` 组根域名服务器发出请求获取顶级域名的地址：
```
.			56335	IN	NS	m.root-servers.net.
.			56335	IN	NS	b.root-servers.net.
.			56335	IN	NS	c.root-servers.net.
.			56335	IN	NS	d.root-servers.net.
.			56335	IN	NS	e.root-servers.net.
.			56335	IN	NS	f.root-servers.net.
.			56335	IN	NS	g.root-servers.net.
.			56335	IN	NS	h.root-servers.net.
.			56335	IN	NS	i.root-servers.net.
.			56335	IN	NS	a.root-servers.net.
.			56335	IN	NS	j.root-servers.net.
.			56335	IN	NS	k.root-servers.net.
.			56335	IN	NS	l.root-servers.net.
.			56335	IN	RRSIG	NS 8 0 518400 20181111050000 20181029040000 2134 . G4NbgLqsAyin2zZFetV6YhBVVI29Xi3kwikHSSmrgkX+lq3sRgp3UuQ3 JQxpJ+bZY7mwzo3NxZWy4pqdJDJ55s92l+SKRt/ruBv2BCnk9CcnIzK+ OuGheC9/Coz/r/33rpV63CzssMTIAAMQBGHUyFvRSkiKJWFVOps7u3TM jcQR0Xp+rJSPxA7f4+tDPYohruYm0nVXGdWhO1CSadXPvmWs1xeeIKvb 9sXJ5hReLw6Vs6ZVomq4tbPrN1zycAbZ2tn/RxGSCHMNIeIROQ99kO5N QL9XgjIJGmNVDDYi4OF1+ki48UyYkFocEZnaUAor0pD3Dtpis37MASBQ fr6zqQ==
;; Received 525 bytes from 8.8.8.8#53(8.8.8.8) in 247 ms
```
- 根域名服务器是 DNS 中最高级别的域名服务器，这些服务器负责返回顶级域的权威域名服务器地址，这些域名服务器的数量总共有 `13` 组，域名的格式从上面返回的结果可以看到是 `.root-servers.net`，每个根域名服务器中只存储了顶级域服务器的 `IP` 地址，大小其实也只有 `2MB` 左右，虽然域名服务器总共只有 13 组，但是每一组服务器都通过提供了镜像服务，全球大概也有几百台的根域名服务器在运行。
- 在这里，我们获取到了以下的 5 条 `NS` 记录，也就是 5 台 `me.` 定义域名 `DNS` 服务器：
```
me.			172800	IN	NS	b0.nic.me.
me.			172800	IN	NS	a2.nic.me.
me.			172800	IN	NS	b2.nic.me.
me.			172800	IN	NS	a0.nic.me.
me.			172800	IN	NS	c0.nic.me.
me.			86400	IN	DS	2569 7 1 09BA1EB4D20402620881FD9848994417800DB26A
me.			86400	IN	DS	2569 7 2 94E798106F033500E67567B197AE9132C0E916764DC743C55A9ECA3C 7BF559E2
me.			86400	IN	RRSIG	DS 8 1 86400 20181113050000 20181031040000 2134 . O81bud61Qh+kJJ26XHzUOtKWRPN0GHoVDacDZ+pIvvD6ef0+HQpyT5nV rhEZXaFwf0YFo08PUzX8g5Pad8bpFj0O//Q5H2awGbjeoJnlMqbwp6Kl 7O9zzp1YCKmB+ARQgEb7koSCogC9pU7E8Kw/o0NnTKzVFmLq0LLQJGGE Y43ay3Ew6hzpG69lP8dmBHot3TbF8oFrlUzrm5nojE8W5QVTk1QQfrZM 90WBjfe5nm9b4BHLT48unpK3BaqUFPjqYQV19C3xJ32at4OwUyxZuQsa GWl0w9R5TiCTS5Ieupu+Q9fLZbW5ZMEgVSt8tNKtjYafBKsFox3cSJRn irGOmg==
;; Received 721 bytes from 192.36.148.17#53(i.root-servers.net) in 59 ms
```
- 当 DNS 解析器从根域名服务器中查询到了顶级域名 `.me` 服务器的地址之后，就可以访问这些顶级域名服务器其中的一台 `b2.nic.me` 获取权威 `DNS` 的服务器的地址了：
```
draveness.me.		86400	IN	NS	f1g1ns1.dnspod.net.
draveness.me.		86400	IN	NS	f1g1ns2.dnspod.net.
fsip6fkr2u8cf2kkg7scot4glihao6s1.me. 8400 IN NSEC3 1 1 1 D399EAAB FSJJ1I3A2LHPTHN80MA6Q7J64B15AO5K  NS SOA RRSIG DNSKEY NSEC3PARAM
fsip6fkr2u8cf2kkg7scot4glihao6s1.me. 8400 IN RRSIG NSEC3 7 2 8400 20181121151954 20181031141954 2208 me. eac6+fEuQ6gK70KExV0EdUKnWeqPrzjqGiplqMDPNRpIRD1vkpX7Zd6C oN+c8b2yLoI3s3oLEoUd0bUi3dhyCrxF5n6Ap+sKtEv4zZ7o7CEz5Fw+ fpXHj7VeL+pI8KffXcgtYQGlPlCM/ylGUGYOcExrB/qPQ6f/62xrPWjb +r4=
qcolpi5mj0866sefv2jgp4jnbtfrehej.me. 8400 IN NSEC3 1 1 1 D399EAAB QD4QM6388QN4UMH78D429R72J1NR0U07  NS DS RRSIG
qcolpi5mj0866sefv2jgp4jnbtfrehej.me. 8400 IN RRSIG NSEC3 7 2 8400 20181115151844 20181025141844 2208 me. rPGaTz/LyNRVN3LQL3LO1udby0vy/MhuIvSjNfrNnLaKARsbQwpq2pA9 +jyt4ah8fvxRkGg9aciG1XSt/EVIgdLSKXqE82hB49ZgYDACX6onscgz naQGaCAbUTSGG385MuyxCGvqJdE9kEZBbCG8iZhcxSuvBksG4msWuo3k dTg=
;; Received 586 bytes from 199.249.127.1#53(b2.nic.me) in 267 ms
```
- 这里的权威 `DNS` 服务是作者在域名**提供商**进行配置的，当有客户端请求 `draveness.me` 域名对应的 `IP` 地址时，其实会从作者使用的 `DNS` 服务商 `DNSPod` 处请求服务的 `IP` 地址：
```
draveness.me.		600	IN	A	123.56.94.228
draveness.me.		86400	IN	NS	f1g1ns2.dnspod.net.
draveness.me.		86400	IN	NS	f1g1ns1.dnspod.net.
;; Received 123 bytes from 58.247.212.36#53(f1g1ns1.dnspod.net) in 28 ms
```
- 最终，`DNS` 解析器从 `f1g1ns1.dnspod.net` 服务中获取了当前博客的 `IP` 地址 `123.56.94.228`，浏览器或者其他设备就能够通过 `IP` 向服务器获取请求的内容了。
- 从整个解析过程，我们可以看出 `DNS` 域名服务器大体分成三类，根域名服务、顶级域名服务以及权威域名服务三种，获取域名对应的 `IP` 地址时，也会像遍历一棵树一样按照从顶层到底层的顺序依次请求不同的服务器。
### 胶水记录
- 在通过服务器解析域名的过程中，我们看到当请求 `me.` 顶级域名服务器的时候，其实返回了 `b0.nic.me` 等域名：
```
me.			172800	IN	NS	b0.nic.me.
me.			172800	IN	NS	a2.nic.me.
me.			172800	IN	NS	b2.nic.me.
me.			172800	IN	NS	a0.nic.me.
me.			172800	IN	NS	c0.nic.me.
...
```
就像我们最开始说的，在互联网中想要请求服务，最终一定需要获取 `IP` 提供服务的**服务器**的 IP 地址；同理，作为 `b0.nic.me` 作为一个 `DNS` 服务器，我也必须获取它的 `IP` 地址才能获得次级域名的 `DNS` 信息，但是这里就陷入了一种循环：

- 如果想要获取 `dravenss.me` 的 `IP` 地址，就需要访问 `me` 顶级域名服务器 `b0.nic.me`
- 如果想要获取 `b0.nic.me` 的 IP 地址，就需要访问 `me` 顶级域名服务器 `b0.nic.me`
- 如果想要获取 `b0.nic.me` 的 IP 地址，就需要访问 `me` 顶级域名服务器 `b0.nic.me`
- …
为了解决这一个问题，我们引入了胶水记录（`Glue Record`）这一概念，也就是在出现循环依赖时，直接在上一级作用域返回 `DNS` 服务器的 `IP` 地址：
```
$ dig +trace +additional draveness.me

...

me.			172800	IN	NS	a2.nic.me.
me.			172800	IN	NS	b2.nic.me.
me.			172800	IN	NS	b0.nic.me.
me.			172800	IN	NS	a0.nic.me.
me.			172800	IN	NS	c0.nic.me.
me.			86400	IN	DS	2569 7 1 09BA1EB4D20402620881FD9848994417800DB26A
me.			86400	IN	DS	2569 7 2 94E798106F033500E67567B197AE9132C0E916764DC743C55A9ECA3C 7BF559E2
me.			86400	IN	RRSIG	DS 8 1 86400 20181116050000 20181103040000 2134 . cT+rcDNiYD9X02M/NoSBombU2ZqW/7WnEi+b/TOPcO7cDbjb923LltFb ugMIaoU0Yj6k0Ydg++DrQOy6E5eeshughcH/6rYEbVlFcsIkCdbd9gOk QkOMH+luvDjCRdZ4L3MrdXZe5PJ5Y45C54V/0XUEdfVKel+NnAdJ1gLE F+aW8LKnVZpEN/Zu88alOBt9+FPAFfCRV9uQ7UmGwGEMU/WXITheRi5L h8VtV9w82E6Jh9DenhVFe2g82BYu9MvEbLZr3MKII9pxgyUE3pt50wGY Mhs40REB0v4pMsEU/KHePsgAfeS/mFSXkiPYPqz2fgke6OHFuwq7MgJk l7RruQ==
a0.nic.me.		172800	IN	A	199.253.59.1
a2.nic.me.		172800	IN	A	199.249.119.1
b0.nic.me.		172800	IN	A	199.253.60.1
b2.nic.me.		172800	IN	A	199.249.127.1
c0.nic.me.		172800	IN	A	199.253.61.1
a0.nic.me.		172800	IN	AAAA	2001:500:53::1
a2.nic.me.		172800	IN	AAAA	2001:500:47::1
b0.nic.me.		172800	IN	AAAA	2001:500:54::1
b2.nic.me.		172800	IN	AAAA	2001:500:4f::1
c0.nic.me.		172800	IN	AAAA	2001:500:55::1
;; Received 721 bytes from 192.112.36.4#53(g.root-servers.net) in 110 ms

...
```
也就是同时返回 `NS` 记录和 `A`（或 `AAAA`） 记录，这样就能够解决域名解析出现的循环依赖问题。

### 服务发现
- 讲到现在，我们其实能够发现 `DNS` 就是一种最早的服务发现的手段，通过虽然服务器的 `IP` 地址可能会经常变动，但是通过相对不会变动的域名，我们总是可以找到提供对应服务的服务器。
- 在微服务架构中，服务注册的方式其实大体上也只有两种，一种是使用 `Zookeeper` 和 `etcd` 等配置管理中心，另一种是使用 `DNS` 服务，比如说 `Kubernetes` 中的 `CoreDNS` 服务。
- 使用 `DNS` 在集群中做服务发现其实是一件比较容易的事情，这主要是因为绝大多数的计算机上都会安装 `DNS` 服务，所以这其实就是一种内置的、默认的服务发现方式，不过使用 `DNS` 做服务发现也会有一些问题，因为在默认情况下 DNS 记录的失效时间是 600s，这对于集群来讲其实并不是一个可以接受的时间，在实践中我们往往会启动单独的 DNS 服务满足服务发现的需求。

## References
- [详解 DNS 与 CoreDNS 的实现原理](https://draveness.me/dns-coredns/)
