import { isLetter } from "../index-5b1e.js"
import { test, assert } from "./framework.mjs"

test("isLetter", async function () {
  const letters = ["a", "b", "z", "A", "B", "Z"]
  for (const letter of letters) {
    assert(isLetter(letter), true, letter)
  }
  const nonLetters = ["1", "9", "0", "!", "%", "("]
  for (const nonLetter of nonLetters) {
    assert(!isLetter(nonLetter), true, nonLetter)
  }
})
