//  /pattern/attreibutes 属性可为g 全局匹配 i 忽视区分大小写 m多行匹配
// 1 创建正则对象自变量方式
const reg = "/hello/i";
const str = "hello";
console.log(reg.test(str));
// 2 用new对象创建

let regexObj = new RegExp("hello");
console.log(regexObj.test(str));

// ^开始符号 & 结束符号
// 元字符 . 匹配除了换行符和结束符之外的所有字符
// 空白字符 \s 匹配空格符  制表符 回车符 换行符 垂直换行符 换页符 \S 匹配非空白字符
// 单词边界 \b 例如 空格后的单词 \bre => readme \B非单词边界
// 单词字符 \w 如a-z A-Z 0-9 以及下划线 \W 非单词字符 除a-z A-Z 0-9 以及下划线以外的所有字符
// 数字字符 \d  非数字字符\D
// \0 NULL字符 \n 换行 \f 换页符 \r 回车符 \t 制表符 \v 垂直制表符
// \xxx 查找8进制 \xdd 16进制dd规定的数字  \uxxxx 16进制数字 xxxx 规定的Unicode

// 量词
// \d{3} 匹配3个数字
// \d{6-12} 匹配6-12个数字
// n{m,}至少m个字符n
// ？0个 或者 1个
// + 至少又一个 *0个或多个
// (？=n) 匹配任何其后指定字符串n的字符串
// (？！n) 匹配任何其后没有紧接指定字符串n的字符串

// [abc]表达式用于查找方括号之间的任何字符
// [^abc]用于查找不是方括号之间的任何字符
// 匹配字符范围[0-9]

// 匹配多个连续字符 ()
// (lo+)=》 loo looo

// exec()方法
// 身份证匹配一 /\d{17}[A-z0-9]/
// 手机号码 /^1[0-9]{10}$/