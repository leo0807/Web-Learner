# Gustafson`s Law

Gustafson's Law 是对于之前 Amdahl's Law的重评估， 提出与1988年的**Reevaluating Amdahl's Law**一文之中，也是说明处理器个数，串行比例和加速比之间的关系。

假设定义系统的串行执行时间为$a$， 系统的并行执行时间为$b$，$n$为处理器的个数，$F$为串行比例，那么则可以得到 

执行时间$= a + b$

总执行时间 $= a + nb$

加速比 $= \frac{a+nb}{a+b} = \frac{a}{a+b} + \frac{nb}{a+b}$ 

其中串行比例$F=\frac{a}{a+b}$，代入得到公式为

加速比 $=F + \frac{n(a+b-a)}{a+b}=F + n(1-\frac{a}{a+b})=F+n(1-F)= F+n-nF=n-F(n-1)$

从公式中可以看出，F（串行化程度）足够小，也即并行化足够高，那么加速比和 cpu 个数成正比，即，F（串行化程度）足够小，也即并行化足够高，那么加速比和 cpu 个数成正比


对一个在单处理机上的工作 w，我们将其扩大到 m 个核上，scaled workload 为 w’=(1-f)w+fmw。对在串行条件下对 w’的处理时间比上在并行条件下对 w’的处理时间即为 Speedup。在这个模型中，问题的规模是可以被扩大(scale)的。从这个公式可以看到，f 固定时，speedup 显线性增长。

$S_{latency}(s) = \frac{TW(s)}{TW} = \frac{W(s)}{W} = 1 - p + sp$
