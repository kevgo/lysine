package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// FileLine represents a line in the input file from MS Access.
type FileLine struct {
	FoodName       string
	NutrientName   string
	NutrientAmount float64 // in grams
}

// FoodInfo represents all information known about 100g of food.
type FoodInfo struct {
	Name         string  // Name of the food
	Lysine       float64 // amount of Lysine in the serving, in mg
	Arginine     float64 // amount of Arginine in the serving, in mg
	Protein      float64 // amount of protein in the serving, in mg
	Carbohydrate float64
	Fat          float64
	Water        float64
}

// FoodDatabase contains information about all food
type FoodDatabase map[string]FoodInfo

// Add incorporates the given line from the file to this Food database.
func (fd *FoodDatabase) Add(line FileLine) {
	foodInfo, exists := (*fd)[line.FoodName]
	if !exists {
		foodInfo = FoodInfo{Name: line.FoodName}
	}
	switch line.NutrientName {
	case "Lysine":
		foodInfo.Lysine = line.NutrientAmount
	case "Arginine":
		foodInfo.Arginine = line.NutrientAmount
	case "Protein":
		foodInfo.Protein = line.NutrientAmount
	case "Carbohydrate, by difference", "Carbohydrate, by summation":
		foodInfo.Carbohydrate = line.NutrientAmount
	case "Total lipid (fat)", "Total fat (NLEA)":
		foodInfo.Fat = line.NutrientAmount
	case "Water":
		foodInfo.Water = line.NutrientAmount
	default:
		fmt.Printf("unknown nutrient: %q\n", line.NutrientName)
		os.Exit(1)
	}
	(*fd)[line.FoodName] = foodInfo
}

func parseLine(text string) FileLine {
	parts := strings.Split(text, "\t")
	amount, err := strconv.ParseFloat(parts[3], 64)
	if err != nil {
		fmt.Printf("cannot parse amount %q: %v\n", parts[3], err)
		os.Exit(1)
	}
	return FileLine{
		FoodName:       parts[0],
		NutrientName:   parts[1],
		NutrientAmount: amount,
	}
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	foodInfos := make(FoodDatabase)
	for scanner.Scan() {
		line := parseLine(scanner.Text())
		foodInfos.Add(line)
	}
	for foodName, foodInfo := range foodInfos {
		if foodInfo.Lysine == 0.0 && foodInfo.Arginine == 0.0 {
			continue
		}
		total := foodInfo.Protein + foodInfo.Carbohydrate + foodInfo.Fat + foodInfo.Water
		if total == 0.0 {
			continue
		}
		fmt.Printf("%s\t%0.1f\t%0.1f\n", foodName, foodInfo.Lysine/foodInfo.Arginine, foodInfo.Lysine+foodInfo.Arginine)
	}
}
