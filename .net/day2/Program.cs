using System;

namespace day2
{
    public enum Gender
    {
        Female,
        Male
    }
    class Program
    {
        static void Main(string[] args)
        {
            Gender gender = Gender.Female;
            string s = 'boy';
            Gender g = (Gender)Enum.Parse(typeof(Gender), s);
            
            Console.WriteLine("Hello World!");
        }
    }
}
