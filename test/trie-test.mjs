import { Trie } from "../index-5431.js"
import { test, assert } from "./framework.mjs"

test("Trie - impartial match", function() {
  const trie = new Trie()
  trie.add("foo", 12)
  trie.add("fool", 13)
  const result = trie.search("fo")
  assert(result.length, 2)
  assert(result[0], 12)
  assert(result[1], 13)
})

test("Trie - full match", function() {
  const trie = new Trie()
  trie.add("foo", 12)
  const result = trie.search("foo")
  assert(result.length, 1)
  assert(result[0], 12)
})

test("Trie - case insensitivity", function() {
  const trie = new Trie()
  trie.add("FOOL", 13)
  const result = trie.search("fool")
  assert(result.length, 1)
  assert(result[0], 13)
})

test("Trie - full mismatch", function() {
  const trie = new Trie()
  trie.add("foo", 12)
  const result = trie.search("zonk")
  assert(result.length, 0)
})

test("Trie - partial mismatch", function() {
  const trie = new Trie()
  trie.add("foo", 12)
  const result = trie.search("foobar")
  assert(result.length, 0)
})
