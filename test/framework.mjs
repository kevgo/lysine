// TEST FRAMEWORK
//
// Have to build our own test framework here because we want to test code written for the browser.
// This means `require` doesn't work and we cannot use NPM packages like Mocha.

import * as fs from "fs"
import * as path from "path"

export async function test(name, testFunc) {
  process.stdout.write(`${name}: `)
  const keepAlive = setTimeout(function() {
    console.log("timeout!")
    process.exit(1)
  }, 100)
  try {
    testFunc()
  } catch (e) {
    console.log("FAIL!\n")
    console.log(e)
    process.exit(1)
  }
  clearTimeout(keepAlive)
  console.log("ok")
}

export function assert(actual, expected, description = "") {
  if (actual !== expected) {
    if (description) {
      description = ` (${description})`
    }
    console.log(`expected ${expected}, got ${actual}${description}`)
    process.exit(1)
  }
}
