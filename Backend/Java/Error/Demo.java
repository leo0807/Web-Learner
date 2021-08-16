public class Demo {
    public static void main(String[] args) {
        try {
            // 匿名类
            new Demo().test(1, 0);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }

    // throws 被动抛出异常 用于method
    public void test(int a, int b) throws ArithmeticException {
        if (b == 0) {
            // throw 主动抛出异常
            throw new ArithmeticException();
        }
    }
}
