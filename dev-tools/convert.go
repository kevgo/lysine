package main

import (
	"bufio"
	"fmt"
	"os"
)

// Amount defines the quantity of nutrients.
type Amount int

const (
	milligram Amount = 1
	gram      Amount = 1000
)

// FileLine represents a line in the input file from MS Access.
type FileLine struct {
	FoodName       string
	NutrientName   string
	NutrientUnit   Amount
	NutrientAmount int
}

// FoodInfo represents all information known about food.
type FoodInfo struct {
	Name     string // Name of the food
	Lysine   int    // amount of Lysine in the serving, in mg
	Arginine int    // amount of Arginine in the serving, in mg
	Protein  int    // amount of protein in the serving, in mg
	Total    int    // total weight of the serving analyzed, in mg
}

// FoodDatabase contains information about all food
type FoodDatabase map[string]FoodInfo

// Add adds the given line from the file to this Food database.
func (fd *FoodDatabase) Add(line FileLine) {
	panic("implement")
}

func parseLine(line string) FileLine {
	panic("implement")
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	foodInfos := make(FoodDatabase)
	for scanner.Scan() {
		line := parseLine(scanner.Text())
		foodInfos.Add(line)
		fmt.Println(".")
	}
}
