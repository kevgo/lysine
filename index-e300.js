export class NutrientsDB {
  constructor() {
    this.foods = []
    this.trie = new Trie()
  }

  load(text) {
    for (const line of text.split("\n")) {
      const [name, ratio, total] = line.split("\t")
      this.foods.push({ name, ratio, total })
    }
    for (let i = 0; i < this.foods.length; i++) {
      const food = this.foods[i]
      for (const namePart of food.name.split(/\W/)) {
        this.trie.add(namePart, i)
      }
    }
  }

  search(query) {
    query = query.trim()
    if (query.length === 0) {
      return []
    }
    const words = query.split(" ")
    let result = this.trie.search(words[0])
    for (const word of words.slice(1)) {
      const matches = this.trie.search(word)
      result = result.filter(element => matches.includes(element))
    }
    return result.slice(0, 30).map(line => this.foods[line])
  }
}

export class Trie {
  constructor() {
    this.subTries = {} // letter --> Trie
    this.values = [] // the values exactly matching this trie and all its subtries
  }

  add(key, value, depth = 0) {
    key = key.toLowerCase()
    this.values.push(value)
    if (depth > 9) {
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
