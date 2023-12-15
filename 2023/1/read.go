package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
	"unicode"
)

func main() {
	argsWithoutProg := os.Args[1:]
	if len(argsWithoutProg) != 1 {
		log.Fatal("Must have one argument to a file path.")
	}

	filePath := argsWithoutProg[0]
	log.Println(filePath)

	file, err := os.Open(filePath)
	if errors.Is(err, os.ErrNotExist) {
		log.Fatal("File does not exist.")
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	total := 0
	for scanner.Scan() {
		first, last := ExtractNumbers(scanner.Text())
		log.Printf("First: %s Last: %s\n", first, last)
		number := first + last
		lineValue, err := strconv.Atoi(number)
		if err != nil {
			log.Fatal("Not a number.")
		}
		total += lineValue
		log.Printf("%d\n", total)
	}
	fmt.Println(total)
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func ExtractNumbers(line string) (first string, last string) {
	log.Println(line)
	first = " "
	for _, val := range line {
		if unicode.IsDigit(val) {
			if first == " " {
				first = string(val)
			}
			last = string(val)
		}
	}

	return
}
