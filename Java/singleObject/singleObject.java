package Java.singleObject;

public class singleObject {
    private singleObject(){

    }

    private singleObject instance = null;
    public singleObject getInstance(){
        if(instance == null){
            instance = new singleObject();
        }
        return instance;
    }
    // public void login(name, password) {
    //     System.out.println("login");
    // }

}
// public class SingletonPatternDemo {
//     public static void main(String[] args) {
//         singleObject object = singleObject.getInstance();
//     }
// }