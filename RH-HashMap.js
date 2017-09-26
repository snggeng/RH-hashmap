import { clearMap, processKey, incrementHash, swapElements } from './utils'

export default class HashMap {
  constructor(size) {
    // Catch errors
    if (!size) throw new Error('HashMap must be initialized with an argument: new HashMap(<Number>).\n')
    if (typeof size !== 'number') throw new TypeError('HashMap requires a Number as argument.\n')
    this.size = size
    this.capacity = 0
    this.keys = new Array(this.size).fill(null)
    this.values = new Array(this.size).fill(null)
  }

  get length() {
    return this.size
  }

  set(k, value) {
    /**
     * Stores the given key/value pair in hash map
     * @getter
     * @param {string} k - key in HashMap
     * @param {object} value - value in HashMap that can be any object data structure
     * @return {boolean} true || false - on success of set()
     */
    // Catch errors
    if (!k || !value) throw new Error('set() method must contain 2 arguments: HashMap.set(<String>, <Object>).\n')
    // if (typeof k !== 'string') return false
    // throw new TypeError('First argument of set() must be of type <String>.\n')
    const key = processKey(k, this)[0]
    let hashIndex = processKey(k, this)[1]
    let probeLength = 0
    let elemToSwap = null
    let elemToSwapFound = false
    let newProbeLength = 0

    while (probeLength < this.size) {
      if (typeof (key) !== 'string') { break }
      // Key does not exist
      if (!this.keys[hashIndex]) {
        // Store probe length with key
        this.keys[hashIndex] = [key, probeLength]
        this.values[hashIndex] = value
        this.capacity += 1
        // Swap if elemToSwap is found
        if (elemToSwapFound) {
          // console.log('element to swap found')
          swapElements(elemToSwap, hashIndex, newProbeLength, this)
        }
        return true
      // Key already exists, update
      } else if (this.keys[hashIndex][0] === key) {
        this.values[hashIndex] = value
        return true
      // Hash index is occupied - start linear probing
      } else if (elemToSwapFound === false && this.keys[hashIndex][1] < probeLength) {
        // If existing element's probe length is lower, track length for swapping
        // console.log('begin linear probing')
        elemToSwap = hashIndex
        elemToSwapFound = true
        newProbeLength = probeLength
      } else {
        // Increment index and try again
        hashIndex = incrementHash(hashIndex, this)
      }
      probeLength += 1
    }
    return false
  }

  get(k) {
    /**
     * Return the value associated with the given key
     * @getter
     * @param {string} k - key in hashMap
     * @return {string} value on success or null if key has no value
     */
    if (typeof (k) !== 'string') return null
    const key = processKey(k, this)[0]
    let hashIndex = processKey(k, this)[1]
    for (let i = 0; i < this.size; i += 1) {
      if (this.keys[hashIndex] !== null && this.keys[hashIndex][0] === key) {
        return this.values[hashIndex]
      }
      // index is null or keys don't match, linear probing
      hashIndex = incrementHash(hashIndex, this)
    }
    return null
  }

  load() {
    /**
     * Return a float value representing the load factor of the data structure.
     * @return {Number} float - load factor
     */
    return parseFloat(this.capacity) / parseFloat(this.size)
  }

  clear() {
    /**
     * Clears content for testing purposes
     */
    clearMap(this)
    this.capacity = 0
  }
}
