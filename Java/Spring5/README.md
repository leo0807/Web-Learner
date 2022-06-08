1. 什么是 IOC

- 控制反转，吧对象创建和对象之间的调用过程，交给 Spring 进行管理
- 是用 IOC 的目的，为了降低耦合成都

2. IOC 底层原理

- XML 解析、工厂模式、反射

3. IOC 接口

- IOC 思想基于 IOC 容器完成，IOC 容器底层就是对象工厂
- Spring 提供 IOC 容器实现的两种方式（接口）：
  - BeanFactory：IOC 容器基本实现，是 Spring 内部的使用接口，不提供开发人员进行使用。（加载配置文件时候不会创建对象，在获取/使用对象才会创建）
  - ApplicatioContext： BeanFactory 的子接口，提供更多强大的功能，一般由开发人员使用。（加载配置文件就会吧配置文件对象进行创建）

4. IOC 操作 Bean 管理
1. 什么是 Bean 管理
   - Spring 创建对象
   - Spring 注入属性
1. Bean 管理操作有两种方式

   - 给予 XML 配置方式
     1. `<bean id="名字" class="路径"></bean>`
     - 在 spring 配置文件中，使用 bean 标签，标签里面添加对应属性，就可以创建对象
     - 在 bean 标签有很多属性，介绍常用的属性
       - id 属性： 标识
       - class 属性：类的全路径（包类路径）
     - 创建对象时候，默认是执行无参数构造方法
   - 基于注解方式

     1. DI：依赖注入，即注入属性

     - 使用 set 方法

       - ```
         <bean id="名字" class="路径">
           <property name="name" value="value"></property>
         </bean>
         ```
         也可以简化为
         ```
         <bean id="名字" class="路径" p:bname="bname" p:bvalue="bname">
         </bean>
         ```

     - 有参构造
       - ```
         <bean id="名字" class="路径">
           <constructor-arg name="name" value="value"></constructor-arg>
         </bean>
         ```

   - XML 注入其他类型属性

     - null 值
       - ```
         <property name="name">
           <null />
         </property>
         ```
     - 属性值包含特殊符号

       - ```
         <property name="addr" value="&lt;&gt;<<南京>>"></property>
         ```

       - ```
         <property name="addr">
           <value><![CDATA[<<南京>>]]></value>
         </property>
         ```

1. 外部 Bean

- 什么是 Bean
- Bean 生命周期

  - 实例化 Instantiation
  - BeanFactory 管理的 Bean 是在使用到 Bean 的时候才会实例化 Bean
  - ApplicantContext 管理的 Bean 在容器初始化的时候就回完成 Bean 实例化

  - 属性赋值 Populate
  - 初始化 Initialization
  - 销毁 Destruction
  - [https://juejin.cn/post/7075168883744718856#heading-3](LINK)
  - Bean 容器在配置文件中找到 Person Bean 的定义，这个可以说是妈妈怀上了。
  - Bean 容器使用 Java 反射 API 创建 Bean 的实例，孩子出生了。
  - Person 声明了属性 no、name，它们会被设置，相当于注册身份证号和姓名。如果属性本身是 Bean，则将对其进行解析和设置。
  - Person 类实现了 BeanNameAware 接口，通过传递 Bean 的名称来调用 setBeanName()方法，相当于起个学名。
  - Person 类实现了 BeanFactoryAware 接口，通过传递 BeanFactory 对象的实例来调用 setBeanFactory()方法，就像是选了一个学校。
  - PersonBean 实现了 BeanPostProcessor 接口，在初始化之前调用用 postProcessBeforeInitialization()方法，相当于入学报名。
  - PersonBean 类实现了 InitializingBean 接口，在设置了配置文件中定义的所有 Bean 属性后，调用 afterPropertiesSet()方法，就像是入学登记。
  - 配置文件中的 Bean 定义包含 init-method 属性，该属性的值将解析为 Person 类中的方法名称，初始化的时候会调用这个方法，成长不是走个流程，还需要自己不断努力。
  - Bean Factory 对象如果附加了 Bean 后置处理器，就会调用 postProcessAfterInitialization()方法，毕业了，总得拿个证。
  - Person 类实现了 DisposableBean 接口，则当 Application 不再需要 Bean 引用时，将调用 destroy()方法，简单说，就是人挂了。
  - 配置文件中的 Person Bean 定义包含 destroy-method 属性，所以会调用 Person 类中的相应方法定义，相当于选好地儿，埋了。

    作者：三分恶
    链接：https://juejin.cn/post/7075168883744718856
    来源：稀土掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

- lombok
- Data
### AOP
- AOP 规则
  1. `execution(public * *(..))execution(public * *(..))`
    - `public 可以省略, 第一个* 代表方法的任意返回值 第二个参数代表任意包+类+方法 （..）任意参数`
  2. 任何一个以`set`开始的方法的执行：
    - `execution(* set*(..)`
  3. UserService 接口的任意方法：
    - `execution(* com.coffee.service.UserService.*(..))`
  4. 定义在 `com.coffee.service 包里的任意方法的执行：
    - `execution(* com.coffee.service..(..))`
    - `第一个 .* 代表任意类, 第二个 .* 代表人以方法`
  5. 定义在`service`包和所有子包里的任意类的任意方法的执行：
    - `execution(* com.coffee.service...(..))`
    - `..* 代表任意包或者子包`
  6. 定义在 `com.coffee` 包和所有子包里的 `UserService` 类的任意方法的执行：
    - `execution( com.coffee..UserService.(..))")`
- `AOP` 的术语
  1. 连接点(`Join point`)：
    - 能够被拦截的地方：Spring AOP 是基于动态代理的，所以是方法拦截的。每个成员方法都可以称之为连接点~
  2. 切点(`Poincut`)：
    - 具体定位的连接点：上面也说了，每个方法都可以称之为连接点，我们具体定位到某一个方法就成为切点。
  3. 增强/通知(`Advice`)：
    - 表示添加到切点的一段`逻辑代码`，并定位连接点的`方位信息`。
      - 简单来说就定义了是干什么的，具体是在哪干
      - `Spring AOP` 提供了 5 种 `Advice` 类型给我们：前置、后置、返回、异常、环绕给开发者使用
  4. 织入(`Weaving`)：
    - 将`增强/通知`添加到目标类的具体连接点上的过程。
  5. 引入/引介(`Introduction`)：
    - 引入/引介允许我们向`现有的类添加新方法或属性`。是一种特殊的增强！
  6. 切面(`Aspect`)：
    - 切面由切点和`增强/通知`组成，它既包括了横切逻辑的定义、也包括了连接点的定义。

- AOP 动态代理

- MyBatis
