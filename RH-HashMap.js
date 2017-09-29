import { clearMap, processKey, incrementHash } from './utils'

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
          this.swapElements(elemToSwap, hashIndex, newProbeLength)
        }
        return true
      // Key already exists, update
      } else if (this.keys[hashIndex][0] === key) {
        this.values[hashIndex] = value
        return true
      // Hash index is occupied - start linear probing
      } else if (elemToSwapFound === false && this.keys[hashIndex][1] < probeLength) {
        // If existing element's probe length is lower, track length for swapping
        [elemToSwap, elemToSwapFound, newProbeLength] = [hashIndex, true, probeLength]
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
    // Check if k is of type String
    if (typeof (k) !== 'string') return null
    // Get key and hashIndex
    const key = processKey(k, this)[0]
    let hashIndex = processKey(k, this)[1]
    // Get value from key
    for (let i = 0; i < this.size; i += 1) {
      // Index exists
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

  delete(k) {
    /**
     * Delete a key/value pair in map
     * @param {string} k - key in hashMap
     * @return {string} value on success or null if key has no value
     */
    // Check if k is of type String
    if (typeof (k) !== 'string') return null
    // Check if Map is empty
    if (!this.load()) return null
    // Get key and hashIndex
    const key = processKey(k, this)[0]
    let hashIndex = processKey(k, this)[1]
    // Delete key/value pair
    for (let i = 0; i < this.size; i += 1) {
      // Key matches, set it to null and return value
      if (this.keys[hashIndex] && this.keys[hashIndex][0] === key) {
        const value = this.values[hashIndex]
        this.keys[hashIndex] = null
        this.values[hashIndex] = null
        this.capacity -= 1
        return value
      }
      // Index is null or keys don't match - linear probing
      hashIndex = incrementHash(hashIndex, this)
    }
    return null
  }

  clear() {
    /**
     * Clears content for testing purposes
     */
    clearMap(this)
    this.capacity = 0
  }

  // Swap "Rich" and "Poor" slots to decrease variance
  swapElements(currentIndex, newIndex, newProbeLength) {
    // Calculate the new probe length for existing element
    let delta = newIndex - currentIndex
    // console.log('new delta ', delta)
    if (delta < 0) { delta = (this.size - currentIndex) + newIndex }
    // Update probes
    this.keys[currentIndex] = [this.keys[currentIndex][0], this.keys[currentIndex][1] + delta]
    this.keys[newIndex] = [this.keys[newIndex][0], newProbeLength]
    let a = this.keys[currentIndex][0]
    let b = this.keys[newIndex][0]
    let c = this.values[currentIndex]
    let d = this.values[newIndex];
    // Swap Elements
    [a, b] = [b, a];
    [c, d] = [d, c];
  }
}
