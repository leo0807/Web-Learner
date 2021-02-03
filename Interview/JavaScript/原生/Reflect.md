
 * Reflect是一个内建的对象，用来提供方法去拦截JavaScript的操作。
 * Reflect不是一个函数对象，所以它是不可构造的，也就是说它不是一个构造器，
 * 你不能通过`new`操作符去新建或者将其作为一个函数去调用Reflect对象。
 * Reflect的所有属性和方法都是静态的。
来源 https://zhuanlan.zhihu.com/p/92700557

## API
- Reflect.apply(target, thisArgument [, argumentsList])
该方法类同于 Function.prototype.apply()
- Reflect.construct(target, argumentsList [, constructorToCreateThis])
这个方法等价于调用 new target(...args)
- Reflect.defineProperty ( target, propertyKey, attributes ) 类同于 Object.defineProperty()
- Reflect.getOwnPropertyDescriptor ( target, propertyKey )
类同于 Object.getOwnPropertyDescriptor(),
- Reflect.deleteProperty ( target, propertyKey )
等同于调用 delete target[name]
- Reflect.getPrototypeOf ( target ) 等同于 Object.getPrototypeOf()
- Reflect.setPrototypeOf ( target, proto )
- Reflect.isExtensible (target) 等同于 Object.isExtensible()
- Reflect.preventExtensions ( target ) 类同于 Object.preventExtensions()
- Reflect.get ( target, propertyKey [ , receiver ])
该方法用来获取对象中某个属性的方法
- Reflect.has(target, propertyKey) 该方法类似于 in 操作符
- Reflect.set ( target, propertyKey, V [ , receiver ] )
类同于上面的 get
