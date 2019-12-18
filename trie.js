export class Trie {
  constructor() {
    this.subTries = {} // letter --> Trie
    this.values = [] // the values exactly matching this trie
  }

  add(key, value) {
    if (key.length === 0) {
      this.values.push(value)
      return
    }
    const firstLetter = key[0]
    const remainder = key.substring(1)
    if (this.subTries[firstLetter] === undefined) {
      this.subTries[firstLetter] = new Trie()
    }
    this.subTries[firstLetter].add(remainder, value)
  }

  search(query) {
    if (query.length === 0) {
      return this.allValues()
    }
    const firstLetter = query[0]
    const remainder = query.substring(1)
    return this.subTries[firstLetter].search(remainder)
  }

  // returns all values of all subtries
  allValues() {
    let result = this.values.slice(0)
    for (const subTrie of Object.values(this.subTries)) {
      result = result.concat(subTrie.allValues())
    }
    return result
  }
}
