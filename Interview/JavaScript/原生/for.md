# for-in循环
for-in循环主要用于遍历对象，for()中的格式：for(keys in zhangsan){}
keys表示obj对象的**每一个键值对的键**。所有循环中，需要使用obj[keys]来取到每一个值！！！for-in 循环，遍历时不仅能读取对象自身上面的成员属性，也能延续原型链遍历出对象的原型属性所以，可以使用hasOwnProperty判断一个属性是不是对象自身上的属性obj.hasOwnProperty(keys)==true 表示这个属性是对象的成员属性，而不是原先属性。
### 缺点 

1.index索引为字符串型数字，不能直接进行几何运算
```
var myArray=[1,2,4,5,6,7];
for (var i in myArray){
    console.log(i+1)
}
输出01，11，21，31，41，51
```
2.遍历顺序有可能不是按照实内部顺序
比如键值分别有数字和字符串的情况下，会先遍历数字，再遍历字符串
    ```
var a = {
    1:"a",
    7:"b",
    4:"c",
    5:"d",
    "-3":"e",
    f:"f",
    "2.2":"g",
    6:"h",
    0:"i",
    "2" : "j"
};

for(var i in a)
    alert(i + ": " + a[i])
    ```
3.使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性
所以for in更适合遍历对象，不要使用for in遍历数组
索引为字符串类型，无法直接进行运算

# for-of
for-of这个方法避开了for-in循环的所有缺陷
- 与forEach()不同的是，它可以正确响应break、continue和return语句 
- for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM NodeList对象。for-of循环也支持字符串遍历

# forEach
实际性能弱于普通for
无法```break```或```continue```返回外层函数
- 可以使用```return```跳过单次循环
- 如果想要跳出整个循环需要使用```throw```抛出

# map
同样不能使用```break```或```return```返回外层函数，但是可以用return 返回值