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
	NutrientAmount float32 // in grams
}

// FoodInfo represents all information known about 100g of food.
type FoodInfo struct {
	Name         string  // Name of the food
	Lysine       float32 // amount of Lysine in the serving, in mg
	Arginine     float32 // amount of Arginine in the serving, in mg
	Protein      float32 // amount of protein in the serving, in mg
	Carbohydrate float32
	Fat          float32
	Water        float32
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
	amount, err := strconv.ParseFloat(parts[3], 32)
	if err != nil {
		fmt.Printf("cannot parse amount %q: %v\n", parts[3], err)
		os.Exit(1)
	}
	return FileLine{
		FoodName:       parts[0],
		NutrientName:   parts[1],
		NutrientAmount: float32(amount),
	}
}

func formatRatio(ratio float32) float32 {
	ratio = ratio * 10
	switch {
	case ratio <= 20:
		return ratio
	case ratio <= 25:
		return 25
	case ratio <= 30:
		return 30
	case ratio <= 35:
		return 35
	default:
		return 45
	}
}

func formatAmount(amount float32) float32 {
	switch {
	case amount <= 10:
		return amount
	case amount <= 15:
		return 15
	case amount <= 20:
		return 20
	case amount <= 25:
		return 25
	case amount <= 30:
		return 30
	case amount <= 40:
		return 40
	case amount <= 50:
		return 50
	case amount <= 60:
		return 60
	case amount <= 70:
		return 70
	default:
		return 80
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
		if foodInfo.Arginine == 0.0 {
			continue
		}
		fmt.Printf("%s\t%0.0f\t%0.0f\n", foodName, formatRatio(foodInfo.Lysine/foodInfo.Arginine), formatAmount(foodInfo.Lysine+foodInfo.Arginine))
	}
}
