TCP的kepp-alive和HTTP的Keep-alive不同
它的作用就是探测对端的连接有没有失效

当有一方因为网络故障或者宕机导致连接失效，由于 TCP 并不是一个轮询的协议，在下一个数据包到达之前，对端对连接失效的情况是一无所知的

在 Linux 下，可以这样查看相关的配置:
sudo sysctl -a | grep keepalive
```
// 每隔 7200 s 检测一次
net.ipv4.tcp_keepalive_time = 7200
// 一次最多重传 9 个包
net.ipv4.tcp_keepalive_probes = 9
// 每个包的间隔重传间隔 75 s
net.ipv4.tcp_keepalive_intvl = 75
```
不过，现状是大部分的应用并没有默认开启 TCP 的keep-alive选项，为什么？
站在应用的角度:

- 7200s 也就是两个小时检测一次，时间太长
- 时间再短一些，也难以体现其设计的初衷, 即检测长时间的死连接
