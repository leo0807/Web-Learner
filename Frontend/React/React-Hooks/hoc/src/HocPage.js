import React from 'react'

// HOC 一个函数 接收一个组件 返回一个组件

function Child(props) {
    return <div>Child</div>
}
const foo = Cmp => props => {
    return (
        <div className="border">
            <Cmp {...props} />
        </div>
    )
}
// 双箭头另一种写法
// const foo = Cmp => {
//     return props => {
//         return (
//             <div className="border">
//                 <Cmp {...props} />
//             </div>
//         )
//     }
// }
const foo2 = Cmp => props => {
    return (
        <div className="greenBorder">
            <Cmp {...props} />
        </div>
    )
}
// 链式调用
// const Foo = foo(Child);
const Foo = foo2(foo(foo(Child)))
function HocPage() {
    return (
        <div>
            <h1>Hoc Page</h1>
            <Foo />
        </div>
    )
}

export default HocPage
