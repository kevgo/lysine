import { NutrientsDB } from "../index-4236.js"
import * as fs from "fs"
import { test, assert } from "./framework.mjs"

test("NutrientsDB - single search term", function() {
  const content = fs.readFileSync("nutrients-b783.tsv", "utf8")
  const nutrientsDB = new NutrientsDB()
  nutrientsDB.load(content)
  const result = nutrientsDB.search("gerber")
  assert(result.length, 4)
})

test("NutrientsDB - multiple search terms", function() {
  const content = fs.readFileSync("nutrients-b783.tsv", "utf8")
  const nutrientsDB = new NutrientsDB()
  nutrientsDB.load(content)
  const result = nutrientsDB.search("gerber splash")
  assert(result.length, 1)
})
