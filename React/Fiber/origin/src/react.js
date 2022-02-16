/**
 * 创建元素（虚拟DOM）的做法
 * @param {*} type 元素的类型 div span p
 * @param {*} config 配置对象 属性 key ref
 * @param  {...any} children 放置所有的儿子，这里会做成一个数组
 */
import { ELEMENT_TEXT } from './constants';
function createElement(type, config, ...children) {
    // babel 会编译出这两个属性
    delete config.__self;
    delete config.__source; //表示这个元素是在那行哪列哪个文件生成的
    return {
        type,
        props: {
            ...config,
            children: children.map(child => {
                // 兼容处理
                // 如果是React元素的话返回自己
                // 如果是文本类型，则返回元素对象
                return typeof child === 'object' ? child : {
                    type: ELEMENT_TEXT,
                    props: { text: child, children: [] }
                }
            }) // 可能是文本形式的数据
        }
    }
}

const React = {
    createElement
}
export default React;