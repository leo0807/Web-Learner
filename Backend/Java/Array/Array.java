package Java.Array;

public class Array{
    private int[] data;
    private int size;

    public Array(int capacity){
        data = new int[capacity];
        size = 0;
    }

    public Array(){
        this(10);
    }
    public int getSiz() {
        return size;
    }
    public int getCapacity() {
        return data.length;
    }
    public boolean isEmpty() {
        return size == 0;
    }
    public void addLast(int e) {
        if(size == data.length){
            throw new IllegalArgumentException("Add Failed. Array is full.");
        }
        data[size] = e;
        size++;
    }
    public void add(int index, int e) {
        if(size == data.length)
            throw new IllegalArgumentException("Add Failed. Array is full.");
        if(index < 0 || index > size)
            throw new IllegalArgumentException("Add Element Failed. Index Error.");
        for (int i = size - 1; i >= index; i--) {
            data[i + 1] = data[i];
        }
        data[index] = e;
        size++;
    }
    @Override
    public String toString() {
        StringBuilder res = new StringBuilder();
        res.append(String.format("Array: size = %d, capacity = %d %n", size, data.length));
        res.append('[');
        for (int i = 0; i < size; i++) {
            res.append(data[i]);
            if(i != size -1){
                res.append(", ");
            }
        }
        res.append(']');
        return res.toString();
    }

    int get(int index){
        if(index < 0 || index > size)
            throw new IllegalArgumentException("Add Element Failed. Index Error.");
        return data[index];
    }
    void set(int index, int e){
        if(index < 0 || index > size)
            throw new IllegalArgumentException("Add Failed. Index Error.");
        data[index] = e;
    }

    // Check whether contains cetain element
    public boolean contain(int e){
        for (int i = 0; i < size; i++) {
            if(data[i] == e)
                return true;
        }
        return false;
    }

    // Find index for a certain element
    public int findIndex(int e){
        for (int i = 0; i < size; i++) {
            if(data[i] == e)
                return i;
        }
        return -1;
    }
    // Delete ELement By Index
    public int deleteElement(int index) {
        if(index < 0 || index > size)
            throw new IllegalArgumentException("Add Failed. Index Error."); 
        int res = data[index];
        for (int i = index; i < size; i++) {
            data[index] = data[index + 1];
        }
        size--;
        return res;
    }

    public int removeFirst(){
        return deleteElement(0);
    }
    public int removeLast(){
        return deleteElement(size - 1);
    }
    public void removeElement(int e){
        int index = findIndex(e);
        if(index != -1)
            deleteElement(index);
    }
}