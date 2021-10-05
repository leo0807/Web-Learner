1. Immutable.js / immer /immutability-helper.js

https://immutable-js.com/

如果数据变更，节点类型不同，按照react的diff算法，会直接将原VDOM树上该节点以及该节点下所有的后代节点全部删除，然后替换为心VDOM树上同一位置的节点。

这种操作导致了性能上的浪费，父组件产生的变化导致了子组件全部被移除再置换新的组件，虽然有```shouldComponentUpdate```生命周期函数和```useCallback```等hook进行值比较避免子组件的渲染或替换，但是这种写法对比来说相对麻烦；而使用```pureComponent```和```Memo```则只是进行浅比较，所以这时候就有了```Immutable```数据类型。

2. Immutable的优势
    1. 节省CPU；避免对于数据的整个深拷贝，简化复杂对象的比较（通过```hashCode```和```valueOf```进行比较）
    2. 节省内存；结构共享，复用已有结构
    3. lazy特性（Seq数据结构）；
        - 例，
        ```
        const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
        .filter(x => x % 2 !== 0)
        .map(x => x * x);
        console.log(oddSquares.get(1));
        ```
        运行上述代码时候，```oddSquares```不同于平常JS运行的，定义的时候即执行后续的filter等函数；只有在```oddSquares```被调用的时候才开始运行；
        且filter的时候，不会把整个数据结构全都做filter操作因为下方的```console.log(oddSquares.get(1))```说明只要求第二个数组，则filter只会运行三次，而对应的map只运行一次
    4. Immutable降低了Mutable带来的复杂度
        - Mutable数据耦合了Time和Value的概念，造成了数据很难被回溯，如
        ```
        function change(func){
            let data = {key: 'val'};
            func(data);
            console.log(data.key);
        }
        ```
        如果data是Immutable类型，无论func里面做了什么操作，输出的```data.key```都是'val'；
    5. 并发安全
        - 上例子中可以同时保证了Immutable数据天生不可变，所以避免了使用各种锁来防止并发问题
3. 使用Immutable的注意点
    1. 变量命名混乱
        - 非常值得注意的一个点。因为可能引用了其他的库或者文件,使得代码里存在immutable数据和非immutable数据。所以immutable变量需要加上 $$或者其他 前缀来区分；且易与原生的Map，List等类型混合。

    2. API上的习惯
        - 赋值操作之后要修改原数据记得要赋值。不然无法更新数据。$$data = $$data.set("hello","immutable")
    3. 为了性能和节省内存, Immutable.js 会努力避免创建新的对象。如果没有数据变化发生的话。
        -   ```
            const { Map } = require('immutable')
            const originalMap = Map({ a: 1, b: 2, c: 3 })
            const updatedMap = originalMap.set('b', 2)
            updatedMap === originalMap // return ture
            ```
            如上代码虽然进行了一顿操作。然而数据并没有改变。所以updatedMap和originalMap还是指向了同一个对象。

            const updatedMap = originalMap.set('b', 4)
            updatedMap === originalMap
            // return false
            此时返回false

            - 关于 React 的更新

            import { is } from 'immutable';
            shouldComponentUpdate: (nextProps, nextState) => {
            return !(this.props === nextProps || is(Map(this.props), Map(nextProps))) ||
                    !(this.state === nextState || is(Map(this.state), Map(nextState)));
            }

作者：风之化身呀
链接：https://www.jianshu.com/p/7bf04638e82a
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。