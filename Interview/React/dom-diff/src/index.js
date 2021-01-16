import { createElement, render, renderDom } from './element.js';
import diff from './diff.js';
import patch from './patch.js';
let virtualDom1 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
]);
let virtualDom2 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('div', { class: 'item' }, ['3'])
]);

// 如果平级元素有互换，会导致重新渲染
// 新增节点也不会更新
// index

let el = render(virtualDom1);
renderDom(el, window.root);
let patches = diff(virtualDom1, virtualDom2);
// 给元素打补丁，重新更新试图
patch(el, patches);
// // 将虚拟DOM转化成真实DOM渲染到页面上
renderDom(el, window.root);
// console.log(el);
// console.log(virtualDom);
// 虚拟DOM只是一个Object，不限时在页面上

// DOM Diff比较两个虚拟DOM区别 比较两个对象的区别
// DOM Diff 作用： 根据两个虚拟对象创建出补丁， 
// 描述改变的内容，将这个补丁用来更新DOM， 局部改变而不是整体更新

// 同级对比
// 如果同级元素位置发生交换， 直接交换元素位置上的值
// 先序深度遍历