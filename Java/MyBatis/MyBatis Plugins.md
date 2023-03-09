### Plugins



(Executor、StatementHandler、ParameterHandler、ResultSetHandler)处提供了简单易用的插 件扩展机制。 
Mybatis对持久层的操作就是借助于四大核心对象。MyBatis支持用插件对四大核心对象进行拦截，
对mybatis来说 插件就是拦截器，用来增强核心对象的功能，增强功能本质上是借助于底层的 动态代理实现的，换句话说， MyBatis中的四大对象都是代理对象

#### 自定义插件

- 设计实现一个自定义插件

```
@Intercepts ({//注意看这个大花括号，也就这说这里可以定义多个@Signature对多个地方拦截，都用这个拦截器 
  @Signature (type = StatementHandler .class , //这是指拦截哪个接口
  method = "prepare"，//这个接口内的哪个方法名，不要拼错了
  args = { Connection.class, Integer .class}),//// 这是拦截的方法的入参，按顺序写到 这，不要多也不要少，如果方法重载，可是要通过方法名和入参来确定唯一的
})
public class MyPlugin implements Interceptor {
  private final Logger logger = LoggerFactory.getLogger(this.getClass()); // //这里是每次执行操作的时候，都会进行这个拦截器的方法内
  @Override
  public Object intercept(Invocation invocation) throws Throwable { //增强逻辑
    System.out.println("对方法进行了增强....");
    return invocation.proceed(); //执行原方法
  }
}
/**
* //主要是为了把这个拦截器生成一个代理放到拦截器链中 * ^Description包装目标对象 为目标对象创建代理对象 * @Param target为要拦截的对象
* @Return代理对象
*/
@Override
public Object plugin(Object target) {
  System.out.println("将要包装的目标对象:"+target); 
  return Plugin.wrap(target,this);
}
/**获取配置文件的属性**/ //插件初始化的时候调用，也只调用一次，插件配置的属性从这里设置进来 Override
public void setProperties(Properties properties) {
  System.out.println("插件配置的初始化参数:"+properties ); 
}
```


#### 源码分析 执行插件逻辑
`Plugin`实现了`InvocationHandler`接口，因此它的`invoke`方法会拦截所有的方法调用。`invoke`方法会对所拦截的方 法进行检测，以决定是否执行插件逻辑。该方法的逻辑如下:
 ````
// -Plugin
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    try {
/*
*获取被拦截方法列表，比如:
* signatureMap.get(Executor.class), 可能返回 [query, update, commit] */
Set<Method> methods = signatureMap.get(method.getDeclaringClass()); //检测方法列表是否包含被拦截的方法
     if (methods != null && methods.contains(method)) {
        //执行插件逻辑
        return interceptor.intercept(new Invocation(target, method, args)); //执行被拦截的方法
        return method.invoke(target, args);
     } catch(Exception e){
       
    }
}
```
`invoke`方法的代码比较少，逻辑不难理解。首先,`invoke`方法会检测被拦截方法是否配置在插件的`@Signature`注解中，
若是，则执行插件逻辑，否则执行被拦截方法。插件逻辑封装在`intercept`中，该 方法的参数类型为`Invocationo Invocation`主要用于存储目标类，方法以及方法参数列表。下面简单看 一下该类的定义
``` 
public class Invocation {
  private final Object target;
  private final Method method;
  private final Object[] args;
  public Invocation(Object targetf Method method, Object[] args) {
    this.target = target;
    this.method = method;
//省略部分代码
public Object proceed() throws InvocationTargetException, IllegalAccessException { 
  //调用被拦截的方法
}
```
