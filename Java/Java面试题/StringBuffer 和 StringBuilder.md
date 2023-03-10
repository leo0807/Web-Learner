# Java 中操作字符串都有哪些类？它们之间有什么区别？

<hr />

### `String`

- `String`是不可变对象，每次对`String`类型的改变时都会生成一个新的对象

### `StringBuilder`

- 线程不安全，效率高，多用于**单线程**
- StringBuilder 则每次都需要复制一次字符数组，再构造一个字符串

```
@Override
public String toString() {
    // Create a copy, don't share the array
    return new String(value, 0, count);
}
```

### `StringBuffer`

```
@Override
public synchronized StringBuffer append(String str) {
    toStringCache = null;
    super.append(str);
    return this;
}
```

- 线程安全，由于加锁的原因，效率不如`StringBuilder`，多用于多线程
- StringBuffer 每次获取 toString 都会直接使用缓存区的 toStringCache 值来构造一个字符串

```
private transient char[] toStringCache;

@Override
public synchronized String toString() {
    if (toStringCache == null) {
        toStringCache = Arrays.copyOfRange(value, 0, count);
    }
    return new String(toStringCache, true);
}
```

- 不频繁的字符串操作使用`String`，操作频繁的情况不建议使用`String`
