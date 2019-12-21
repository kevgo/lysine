export class NutrientsDB {
  constructor() {
    this.foods = []
    this.trie = new Trie()
  }

  load(text) {
    for (const line of text.split("\n")) {
      const [name, lysine, arginine, protein] = line.split("\t")
      this.foods.push({ name, lysine, arginine, protein })
    }
    for (let i = 0; i < this.foods.length; i++) {
      const food = this.foods[i]
      for (const namePart of food.name.split(/\W/)) {
        this.trie.add(namePart, i)
      }
    }
  }

  search(query) {
    return this.trie.search(query).map(line => this.foods[line])
  }
}

export class Trie {
  constructor() {
    this.subTries = {} // letter --> Trie
    this.values = [] // the values exactly matching this trie and all its subtries
  }

  add(key, value, depth = 0) {
    key = key.toLowerCase()
    if (depth > 1 && this.values.length < 30) {
      this.values.push(value)
    }
    if (depth > 6) {
      return
    }
    if (key.length === 0) {
      return
    }
    const firstLetter = key[0]
    const remainder = key.substring(1)
    if (!isLetter(firstLetter)) {
      this.add(remainder, value, depth)
      return
    }
    if (this.subTries[firstLetter] === undefined) {
      this.subTries[firstLetter] = new Trie()
    }
    this.subTries[firstLetter].add(remainder, value, depth + 1)
  }

  search(query) {
    if (query.length === 0) {
      return this.values
    }
    const firstLetter = query[0]
    const remainder = query.substring(1)
    if (this.subTries[firstLetter] === undefined) {
      return []
    }
    return this.subTries[firstLetter].search(remainder)
  }
}

export function isLetter(char) {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
}
