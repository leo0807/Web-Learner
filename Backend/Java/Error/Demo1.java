// 自定义的异常类
public class Demo1 extends Exception {
    private int detail;

    public Demo1(int a) {
        this.detail = a;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Self-defined Exception" + detail;
    }
}
