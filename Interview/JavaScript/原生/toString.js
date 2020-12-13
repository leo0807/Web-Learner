
// 所有的对象都继承有toString() 和 valueOf() 方法，对象到字符串，对象到数字的转换，
// 会通过调用待转换对象的这两个方法中的一个来完成。
    
    //我们先创建一个对象，并修改其toString和valueOf方法
    var obj={
        
        i:10,
        
        valueOf:function(){
            
            console.log('执行了valueOf()');
            
            return this.i+20
            
        },
        
        toString:function(){
            
            console.log('执行了toString()');
            
            return this.valueOf()+20
        }
    }
    
    //当我们调用的时候：
    
    console.log( obj )    //50       执行了toString() 执行了valueOf()
    console.log( +obj )    //30       执行了valueOf()
    console.log( obj > 40 )    //false       执行了valueOf()
    console.log( obj==30 )    //true       执行了valueOf()
    console.log( obj===30 )    //false
    //最后这个未输出任何字符串，个人猜想是这样的：全等比较时，js解析器直接先判断类型是否一样，明显一个是Object，一个是Number，所以直接不相等，根本不需要再去求值了。