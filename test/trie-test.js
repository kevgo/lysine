import { Trie } from "../trie.js"

const trie = new Trie()
trie.add("foo", 12)
trie.add("fool", 13)

let result = trie.search("fo")
assert(result.length, 2, "fo result length")
assert(result[0], 12)
assert(result[1], 13)

result = trie.search("foo")
assert(result.length, 2)
assert(result[0], 12)
assert(result[1], 13)

result = trie.search("fool")
assert(result.length, 1)
assert(result[0], 13)

function assert(actual, expected, description) {
  if (actual !== expected) {
    if (description) {
      console.log(description)
    }
    console.log(`expected ${expected}, got ${actual}`)
    process.exit(1)
  }
}
