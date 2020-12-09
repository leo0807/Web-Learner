package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var values []int

	for {
		fmt.Println("Please enter values. Insert \"x\" to exit")
		input := readInput()
		if strings.ToLower(input) == "x" {
			break
		}
		value, err := strconv.Atoi(input)
		if err != nil {
			fmt.Printf("Invalid value. Error: %s", err.Error())
		} else {
			values = insertSorted(values, value)
			fmt.Printf("Current values are: %v\n", values)
		}
	}
}

func readInput() string {
	scanner := bufio.NewScanner(os.Stdin)
	if scanner.Scan() {
		return scanner.Text()
	}
	panic("No value")
}

func insertSorted(values []int, newValue int) []int {
	values = append(values, newValue)
	for i, v := range values {
		if v > newValue {
			copy(values[i+1:], values[i:])
			values[i] = newValue
			break
		}
	}
	return values
}