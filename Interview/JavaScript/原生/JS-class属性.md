- 实例属性：constructor里面的属性为实例属性，即定义在this对象上
- 原型属性：除去实例属性都称为原型属性，即定义在class类上
- hasOwnProperty方法：可以通过hasOwnProperty()方法进行判断属性是否是实例属性
- in操作符：能够访问到属性时返回true,无论是实例属性还是原型属性

static 静态属性，静态方法 可以被继承，方法不会被**实例**继承， 而是直接通过类来调用
静态方法被用于实现属于整个类的功能。它与具体的**类实例**无关
