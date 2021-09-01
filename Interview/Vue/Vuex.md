# Vuex
## Vuex优势
1. 能够在Vuex中集中管理共享的数据，易于开发和维护
2. 能够高效地实现组件之间的数据共享，避免**props drill**问题
3. 春初在Vuex中的数据都是响应式的，能够实时保持数据与页面的同步

## Mutations
1. 只能通过Mutations变更Store数据，不可以直接操作Store中数据（虽然使用methods方法也可以无错修改数据）
2. 通过这种方式虽然操作繁琐一些，但是可以集中监控所有数据变化
3. Mutations中不可以执行**异步操作**，否则Vuex调试器无法正常显示，**Action**可以用来执行异步操作，在method中通过**dispatch**触发Action的异步操作

## Getter
1. Getter用于store中的已有数据进行加工处理之后形成新的数据，类似Vue中的计算属性
2. Store中的数据发生变化，Getter的数据也会跟着变化