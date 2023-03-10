### 父类强制转换子类原则
```
public class TestObjectConvert {

	public static void main(String[] args) {
		test1();
		test2();
	}

	private static void test1() {
		Fruit fruit1 = new Fruit();
		Apple apple1 = new Apple();
		apple1 = (Apple) fruit1; // java.lang.ClassCastException
	}

	private static void test2() {
		Fruit fruit1 = new Apple();
		Apple apple1 = new Apple();
		apple1 = (Apple) fruit1;
	}

	static class Fruit {

	}

	static class Apple extends Fruit {

	}

}
```

结果是：

```
test1：报类转异常；
test2：转换正常。
```

**所以，想让父类强制转换成子类，不是没有可能，除非父类是子类构造出来的实例，不然是不能强转的。**

为什么呢？

如上代码，如果父类实例出来的对象是Orange，Orange当然不能强制转成Apple，所以说父类只有该子类对应的实例才能强转。

### 参考文献
- [JavaStack](https://github.com/javastacks/javastack/blob/master/articles/Java/%E5%9F%BA%E7%A1%80/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%90%9E%E6%87%82%20transient%20%20%E5%85%B3%E9%94%AE%E5%AD%97%E4%BA%86%E5%90%97%EF%BC%9F.md)
