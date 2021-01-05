// 找规律：mat[i][j]被旋转到了mat[j][n-i-1]的位置
import java.util.*;
 
public class Solution {
    public int[][] rotateMatrix(int[][] mat, int n) {
        // write code here
        int[][] temp=new int[n][n];
         
        for(int i=0;i<n;i++)
        {
            for(int j=0;j<n;j++)
            {
                temp[j][n-1-i]=mat[i][j];               
            }
        }       
        return temp;   
    }
}