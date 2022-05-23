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

- lombok
- Data

- AOP 动态代理

- MyBatis
