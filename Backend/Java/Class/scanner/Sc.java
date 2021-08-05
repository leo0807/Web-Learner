package Backend.Java.Class.scanner;

import java.util.Scanner;

public class Sc {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Use nextLine method to receive message");
        if (scanner.hasNextLine()) {
            String str = scanner.nextLine();
            System.out.println("The output content is :" + str);
        }
        scanner.close();
    }
}