### Swagger3 学习

#### 标识

- `@Api`
- `@ApiOperation("xxx")`：用户方法上，为该接口注释
- `@ApiImplicationParams`： 用在请求方法上，表示一组参数说明
- `@ApiImplicationParam`： 用于注解中，通过`name`制定一个请求参数的各个方面
  - `name`：参数名称
  - `value`：参数的解释
  - `required`：是否必须
  - `paramType`：参数类型 query ｜ path
    - `header`
    - `query`
    - `path`
    - `body`
    - `form`
  - `dataType`： 参数类型，如`String`
  - `defaultValue`：参数的默认值
- `@ApiModel`：用于实体类
- `@ApiModelProperty`：用于实体类的属性

#### 参考资料

[知乎](https://zhuanlan.zhihu.com/p/364143971)
