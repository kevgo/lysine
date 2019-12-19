export class Trie {
  constructor() {
    this.subTries = {} // letter --> Trie
    this.values = [] // the values exactly matching this trie and all its subtries
  }

  add(key, value, depth = 0) {
    if (depth > 1) {
      this.values.push(value)
    }
    if (key.length === 0) {
      return
    }
    const firstLetter = key[0]
    const remainder = key.substring(1)
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
    return this.subTries[firstLetter].search(remainder)
  }
}
