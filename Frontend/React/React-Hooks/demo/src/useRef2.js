/**
 * useRef是一个方法，且useRef返回一个可变的ref对象（对象！！！）
 * initialValue被赋值给其返回值的.current对象
 * 可以保存任何类型的值:dom、对象等任何可辨值
 * ref对象与自建一个{current：‘’}对象的区别是：useRef会在每次渲染时返回同一个ref对象，即返回的ref对象在组件的整个生命周期内保持不变。自建对象每次渲染时都建立一个新的。
ref对象的值发生改变之后，不会触发组件重新渲染。有一个窍门，把它的改边动作放到useState()之前。
本质上，useRef就是一个其.current属性保存着一个可变值“盒子”。目前我用到的是pageRef和sortRef分别用来保存分页信息和排序信息。
 */

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
const RefDemo = () => {
    const domRef = useRef(1);
    const childRef = useRef(null);
    useEffect(() => {
        console.log('Initial domRef value', domRef.current, domRef);
        console.log('Initial childRef value', childRef.current, childRef);
    });
    const showChild = () => {
        console.log('ChildRef value', childRef.current, childRef);
        childRef.current.say();
    }
    return (
        <div style={{ margin: "100px", border: "2px dashed", padding: "20px" }}>
            <h2>这是外层组件</h2>
            <div
                onClick={() => {
                    console.log("ref:deom", domRef, domRef.current);
                    domRef.current.focus();
                    domRef.current.value = 'hh';
                }}
            >
                <label>这是一个dom节点</label><input ref={domRef} />
            </div>
            <br />
            <p onClick={showChild} style={{ marginTop: "20px" }}>
                这是子组件
      </p>
            <div style={{ border: "1px solid", padding: "10px" }}>
                <Child ref={childRef} />
            </div>
        </div>
    );
}

export default RefDemo;

// 知识点总结

// useImperativeHandle(ref, createHandle, [deps])可以自定义暴露给父组件的实例值。如果不使用，父组件的ref(chidlRef)访问不到任何值（childRef.current == null）
// useImperativeHandle应该与forwradRef搭配使用
// React.forwardRef会创建一个React组件，这个组件能够将其接受的ref属性转发到其组件树下的另一个组件中。
// React.forward接受渲染函数作为参数，React将使用prop和ref作为参数来调用此函数。

// 作者：是你的山楂
// 链接：https://juejin.cn/post/6844904174417608712
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
const Child = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        say: sayHello,
    }));
    const sayHello = () => {
        alert("hello,我是子组件");
    };
    return <h3>子组件</h3>;
});

// const ChildComponent = (props, ref) => {
//     useImperativeHandle(ref, () => ({
//         say: sayHello,
//     }));
//     const sayHello = () => {
//         alert("hello,我是子组件");
//     };
//     return <h3>子组件</h3>;
// };
// const Child = forwardRef(ChildComponent);