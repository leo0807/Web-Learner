public class InnerClass {
    // Outer Class
    private int id = 10;

    public void out() {
        System.out.println("This is outer class");
    }

    public class Inner {
        public void inner() {
            System.out.println("This is inner class");
        }

        // 获得外部类私有属性
        public void getId() {
            System.out.println(id);
        }
    }
}
