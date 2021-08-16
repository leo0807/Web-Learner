# Gustafson`s Law

Gustafson's Law 是对于之前 Amdahl's Law的重评估， 提出与1988年的**Reevaluating Amdahl's Law**一文之中，也是说明处理器个数，串行比例和加速比之间的关系。

假设定义系统的串行执行时间为$\alpha$， 系统的并行执行时间为$b$，$n$为处理器的个数，$F$为串行比例，那么则可以得到 

其公式为

$S_{latency}(s) = \frac{TW(s)}{TW} = \frac{W(s)}{W} = 1 - p + sp$

其中，
