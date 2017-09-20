

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
    if (typeof k !== 'string') throw new TypeError('First argument of set() must be of type <String>.\n')
    // if (this.load() > 1) return
    // console.log('type of key', typeof(k))
    const key = this.processKey(k)[0]
    let hashIndex = this.processKey(k)[1]
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
        this.capacity++
        // Swap if elemToSwap is found
        if (elemToSwapFound) {
          // console.log('elem to swap found: ', elemToSwap, hashIndex)
          this.swapElements(elemToSwap, hashIndex, newProbeLength)
        }
        return true
      } else if (this.keys[hashIndex][0] === key) {
        // Key already exists, update
        // console.log('update existing key')
        this.values[hashIndex] = value
        return true
      }
      // Hash index is occupied - start linear probing
      // If existing element's probe length is lower, track length for swapping
      if (!elemToSwapFound && this.keys[hashIndex][1] < probeLength) {
        elemToSwap = hashIndex
        elemToSwapFound = true
        newProbeLength = probeLength
        // [elemToSwap, elemToSwapFound, newProbeLength] = [hashIndex, true, probeLength]
      }
      // Increment index and try again
      hashIndex = this.incrementHash(hashIndex)

      probeLength += 1
    }
    return false
  }

  get(k) {
    /**
     * Return the value associated with the given key
     * @getter
     * @param {string} key - key in hashMap
     * @return {string} value on success or null if key has no value
     */

    // Check if HashMap is empty
    if (this.load() === 0) return null
    const key = this.processKey(k)[0]
    let hashIndex = this.processKey(k)[1]
    for (let i = 0; i < this.size; i += 1) {
      if (this.keys[hashIndex] !== null && this.keys[hashIndex][0] === key) {
        // let value = this.values[hashIndex]
        // [this.keys[hashIndex], this.values[hashIndex]] = [null, null]
        // this.capacity--
        return this.values[hashIndex]
      }
      // index is null or keys don't match, linear probing
      hashIndex = this.incrementHash(hashIndex)
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
    // Clears content for testing purposes
    this.keys.clearArray()
    this.values.clearArray()
    this.capacity = 0
  }

  // Helper Functions
  clearArray() {
    // fastest way to empty array keeping var references via jsperf
    while (this.length > 0) { this.pop() }
  }
  processKey(key) {
    return [key, this.hashCode(key) % this.size]
  }

  incrementHash(index) {
    return (index + 1) % this.size
  }

  swapElements(currentIndex, newIndex, newProbeLength) {
    // Calculate the new probe length for existing element
    let delta = newIndex - currentIndex
    if (delta < 0) { delta = (this.size - currentIndex) + newIndex }
    let a = this.keys[currentIndex]
    let b = this.keys[newIndex]
    a = [this.keys[currentIndex][0], this.keys[currentIndex][1] + delta]
    b = [this.keys[newIndex][0], newProbeLength]
    // Swap Elements
      [a, b] = [b, a]
        [this.values[currentIndex], this.values[newIndex]] = [this.values[newIndex], this.values[currentIndex]]
  }
  // Naive hashCode function that returns only positive hashCodes
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (((hash << 5) - hash) + str.charCodeAt(i))
    }
    return hash & 0xFFFFFFFF;
  }

  get probeLengths() {
    for (const length in this.keys) {
      if (length) return length[1]
    }
  }
}
