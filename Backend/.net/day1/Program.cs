using System;
using System.Collections.Generic;

namespace day1
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> strList = new List<string>();
            strList.Add("Test");
            strList.Add("Test1");
            strList.Add("Test2");
            foreach(var str in strList){
                Console.WriteLine(str);
            }
            int age = int.Parse(Console.ReadLine());        
            Console.WriteLine("Hello World!");
        }
    }
}
