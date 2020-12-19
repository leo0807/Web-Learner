BFC主要作用 隔离保护 就是一个相对独立的布局环境，它内部元素的布局不受外面布局的影响。
它可以通过以下任何一种方式来创建： 

float 的值不为 none 
position 的值不为 static 或者 relative 
display 的值为 table-cell , table-caption , inline-block , flex , 或者 inline-flex 中的其中一个 
overflow 的值不为 visible