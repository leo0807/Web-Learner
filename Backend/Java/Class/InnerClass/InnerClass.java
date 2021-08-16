public class InnerClass {
    // Outer Class
    private int id = 10;

    public void out() {
        System.out.println("This is outer class");
    }
    // 内部类
    public class Inner {
        public void inner() {
            System.out.println("This is inner class");
        }

        // 获得外部类私有属性
        public void getId() {
            System.out.println(id);
        }
    }

    // 局部内部类
    public void method() {
        class PartialInner {
            
        }
    }
}
