package Backend.Java.网络编程;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Demo1 {
    public static void main(String[] args) {
        try {
            InetAddress inetAddress = InetAddress.getByName("127.0.0.1");
            System.out.println(inetAddress);
            InetAddress inetAddress2 = InetAddress.getByName("www.baidu.com");
            System.out.println(inetAddress2);
            
            System.out.println(inetAddress2.getAddress());
            System.out.println(inetAddress2.getAddress());
            System.out.println(inetAddress2.getAddress());
        } catch (UnknownHostException e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }
}
