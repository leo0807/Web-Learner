xxx.map()
小括号中需要接受一个函数 
无论如何这个函数都会接收三个参数 分别为 item， index， array
例如
```
arr = [1,2,3]
arr.map(console.log)
等同于
arr.map(function(item,index,array){
    return console.log(item,index,array)
})
```
parseInt只能接收两个参数，多余的参数会被忽略
第一个参数是字符串，但是输入一个“0x”开头的字符串，这样parseInt会按照16进制转换
第二个参数是基数，有两类选择；默认为0，转换为10进制；剩下为2-36， 超过这个范围则返回NaN

```
['1', '2', '3'].map(parseInt)
```
的输出结果为```1， NaN， NaN```
解析：
```
['1','2', '3'].map(parseInt)
['1', '2', '3'].map(function (item, index, array) {
    return parseInt(item,index,array)
})
parseInt('1', 0, ['1', '2', '3'])
parseInt('2', 1, ['1', '2', '3'])
parseInt('3', 2, ['1', '2', '3'])
```

