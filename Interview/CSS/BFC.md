# BFC => Box Formatting context

BFC主要作用 隔离保护 就是一个相对独立的布局环境，它内部元素的布局不受外面布局的影响。
它可以通过以下任何一种方式来创建： 

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，**相当于一个独立的容器**，里面的元素和外部的元素相互不影响。

# 创建 BFC 的方式有：
1. html 根元素
2. float 浮动, 值不为 none
3. 绝对定位, 值不为 static 或者 relative
4. overflow 不为 visiable
5. display 为表格布局或者弹性布局, table-cell , table-caption , inline-block , flex , 或者 inline-flex 中的其中一个


# BFC 主要的作用是：
1. 清除浮动
2. 防止同一 BFC 容器中的相邻元素间的**外边距重叠**问题