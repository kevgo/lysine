import { NutrientsDB } from "../index.js"
import * as fs from "fs"
import { test, assert } from "./framework.mjs"

test("NutrientsDB", function() {
  const content = fs.readFileSync("nutrients.tsv", "utf8")
  const nutrientsDB = new NutrientsDB()
  nutrientsDB.load(content)
  const result = nutrientsDB.search("gerber")
  assert(result.length, 4)
  assert(result[0].name, "Babyfood, finger snacks, GERBER, GRADUATES, PUFFS, apple and cinnamon")
})
