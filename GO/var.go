package main

import ("fmt")

func main() {
	var inputNum float32
	fmt.Println("Input a Number")
	fmt.Scan(&inputNum)
	var y int = int(inputNum)
  	fmt.Println("Trancated num", y)
}
