# Convert tool

### what is it

- data import tool

### what does it

- converts [USDA food data]() exported from MS Access into the format needed by
  this application

### how to use it

1.  download food nutrition data in MS Access format from USDA website:
    https://fdc.nal.usda.gov/download-datasets.html

2.  create new query in MS Access

        SELECT f.description, n.name, n.unitname, fn.amount
        FROM nutrient AS n INNER JOIN (
          foodnutrient AS fn INNER JOIN food AS f ON fn.fdcid = f.fdcid) ON n.id = fn.nutrientid
        WHERE
          n.name In ("Lysine","Arginine","Protein","Water","Total lipid (fat)", "Total fat (NLEA)", "Carbohydrate, by difference", "Carbohydrate, by summation")
        ORDER BY description

3.  export the Query into a text file, entries are tab-separated, no quotes

4.  convert exported data to format needed by this application

    cat exported.tsv | go run dev-tools/convert/convert.go > nutrients.tsv
