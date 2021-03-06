SYN：同步序列编号（Synchronize Sequence Numbers）。是TCP/IP建立连接时使用的握手信号

- SYN表示建立连接
- FIN表示关闭du连接
- ACK表示响应

SYN(synchronous),建立联机。
ACK(acknowledgement),确认。
PSH(push),传输。
FIN(finish),结束。
RST(reset),重置。
URG(urgent),紧急。 
URG：紧急标志。紧急标志为"1"表明该位有效。
ACK：确认标志。表明确认编号栏有效。大多数情况下该标志位是置位的。TCP报头内的确认编号栏内包含的确认编号（w+1）为下一个预期的序列编号，同时提示远端系统已经成功接收所有数据。
PSH：推标志。该标志置位时，接收端不将该数据进行队列处理，而是尽可能快地将数据转由应用处理。在处理Telnet或rlogin等交互模式的连接时，该标志总是置位的。
RST：复位标志。用于复位相应的TCP连接。
SYN：同步标志。表明同步序列编号栏有效。该标志仅在三次握手建立TCP连接时有效。它提示TCP连接的服务端检查序列编号，该序列编号为TCP连接初始端（一般是客户端）的初始序列编号。在这里，可以把TCP序列编号看作是一个范围从0到4，294，967，295的32位计数器。通过TCP连接交换的数据中每一个字节都经过序列编号。在TCP报头中的序列编号栏包括了TCP分段中第一个字节的序列编号。
FIN：结束标志

三次握手前，**服务端**的状态从CLOSED变为LISTEN, 同时在内部创建了两个队列：**半连接队列**和**全连接队列**，即SYN队列和ACCEPT队列。
# 半连接队列
当客户端发送SYN到服务端，服务端收到以后回复ACK和SYN，状态由LISTEN变为SYN_RCVD，此时这个连接就被推入了SYN队列，也就是半连接队列。
# 全连接队列
当客户端返回ACK, 服务端接收后，三次握手完成。这个时候连接等待被具体的应用取走，在被取走之前，它会被推入另外一个 TCP 维护的队列，也就是全连接队列(Accept Queue)。

# SYN Flood 攻击原理
SYN Flood 属于典型的 DoS/DDoS 攻击。其攻击的原理很简单，就是用客户端在短时间内伪造大量不存在的 IP 地址，并向服务端疯狂发送SYN。对于服务端而言，会产生两个危险的后果:

处理大量的SYN包并返回对应ACK, 势必有大量连接处于SYN_RCVD状态，从而占满整个半连接队列，无法处理正常的请求。
由于是不存在的 IP，服务端长时间收不到客户端的ACK，会导致服务端不断重发数据，直到耗尽服务端的资源。

# 如何应对 SYN Flood 攻击？

增加 SYN 连接，也就是增加半连接队列的容量。
减少 SYN + ACK 重试次数，避免大量的超时重发。
利用 SYN Cookie 技术，在服务端接收到SYN后不立即分配连接资源，而是根据这个SYN计算出一个Cookie，连同第二次握手回复给客户端，在客户端回复ACK的时候带上这个Cookie值，服务端验证 Cookie 合法之后才分配连接资源。
