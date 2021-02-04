1. any类型可以赋值给任意类型的变量
unknow则不可以直接赋值给任意变量，需要做类型检测或者类型断言(例，s = e as string 或s = <string>e)，unkown是安全类型的any

2. 函数返回值void和never的区别
void返回空，undefined
never从来不返回值，如throw new Error XXX

3. Object
[propName: string] 表示字符串类型的属性名称
let c: {name: string, [propName: string]: any};
c = {name: 'junxu', gender: 'male', age: '18'}

let j = {name: string} & {age: number}

## 限制函数
let d: (a:number. b:number)=> number;

## 数组
let e: string[];
let g: Array<number>;

## 元组（固定长度的数组）
let e :[string, string]

## 枚举
enum Gender{
    Male = 1,
    Female = 0
}
let i = {name: string, gender: Gender};
i = {
    name: 'junxu',
    gender: Gender.Male
}

# tsc编译选项
自动编译 tsc app.ts -w

tsconfig.json {} 可以使用tsc命令且不指定文件名的情况 编译所有同级别的ts文件
**任意目录 * 任意文件
