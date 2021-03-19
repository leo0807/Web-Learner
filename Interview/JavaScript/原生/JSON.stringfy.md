JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串

# 关于序列化，有下面五点注意事项：

1. 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。

布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。

所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

不可枚举的属性会被忽略

toJSON 方法
如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化，例如：
```
var obj = {
    foo: 'foo',
    toJSON: function () {
        return 'bar';
    }
};
JSON.stringify(obj); // '"bar"'
JSON.stringify({x: obj}); // '{"x":"bar"}'
```