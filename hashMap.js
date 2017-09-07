class HashMap{
  constructor(size){
    this.size = size
    this.capacity = 0
    this.keys = new Array(this.size).fill(null)
    this.values = new Array(this.size).fill(null)
  }

  set(k, value) {
    /**
     * Stores the given key/value pair in hash map
     * @getter
     * @param {string} k - key in HashMap
     * @param {object} value - value in HashMap that can be any object data structure
     * @return {boolean} true || false - on success of set()
     */
     let key = this.processKey(k)[0],
         hashIndex = this.processKey(k)[1],
         probeLength = 0,
         elemToSwap = null,
         elemToSwapFound = false,
         newProbeLength = 0

      while (probeLength < this.size) {
        // Key does not exist
        if (!this.keys[hashIndex]) {
          // Store probe length with key
          //console.log('key does not exist')
          //if (hashIndex < 0) {hashIndex *= -1}
          this.keys[hashIndex] = [key, probeLength]
          //console.log(hashIndex)
          this.values[hashIndex] = value
          this.capacity++
          // Swap if elemToSwap is found
          if (elemToSwapFound) {
            //console.log('elem to swap found: ', elemToSwap, hashIndex)
            this.swapElements(elemToSwap, hashIndex, newProbeLength)
          }
          return true
        } else if (this.keys[hashIndex][0] === key){
          // Key already exists, update
          //console.log('update existing key')
          this.values[hashIndex] = value
          return true
        } else {
          // Hash index is occupied - start linear probing
          // If existing element's probe length is lower, track length for swapping

          if (!elemToSwapFound && this.keys[hashIndex][1] < probeLength) {
            elemToSwap = hashIndex
            elemToSwapFound = true
            newProbeLength = probeLength
            //[elemToSwap, elemToSwapFound, newProbeLength] = [hashIndex, true, probeLength]
          }
          // Increment index and try again
          hashIndex = this.incrementHash(hashIndex)
        }
        probeLength++
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
     let key = this.processKey(k)[0],
         hashIndex = this.processKey(k)[1]
      // console.log('hashindex', hashIndex, typeof(hashIndex))
      // console.log('keys', this.keys)
      // console.log('hash index', this.keys[hashIndex][0])
      for (let i =0; i < this.size; i++) {
        if (this.keys[hashIndex] !== null && this.keys[hashIndex][0] === key) {
          // let value = this.values[hashIndex]
          // [this.keys[hashIndex], this.values[hashIndex]] = [null, null]
          // this.capacity--
          return this.values[hashIndex]
        } else {
          // index is null or keys don't match, linear probing
          hashIndex = this.incrementHash(hashIndex)
        }
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
  clearArray(arr) {
    while (arr.length > 0) { arr.pop() } // fastest way to empty array keeping var references via jsperf
  }

  processKey (key) {
    return [key, this.hashCode(key) % this.size]
  }

  incrementHash(index) {
    return (index + 1) % this.size
  }

  swapElements(currentIndex, newIndex, newProbeLength) {
    // Calculate the new probe length for existing element
    let delta = newIndex - currentIndex
    if (delta < 0) { delta = this.size - currentIndex + newIndex }
    let a = this.keys[currentIndex]
    let b = this.keys[newIndex]
    a = [this.keys[currentIndex][0], this.keys[currentIndex][1] + delta]
    b = [this.keys[newIndex][0], newProbeLength]
    // Swap Elements
    [a, b] = [b, a]
    [this.values[currentIndex], this.values[newIndex]] = [this.values[newIndex], this.values[currentIndex]]
  }

  hashCode(str){
    let hash = 0;
    for(let i = 0; i < str.length; i++) {
      hash = (((hash << 5) - hash) + str.charCodeAt(i))
    }
    return hash & 0xFFFFFFFF;
  }

  get probeLengths() {
    for (let length in this.keys) {
      if (length) return length[1]
    }
  }
}

let NaiveHashMap = class{
  constructor(initialCapacity) {
    this.length = 0
    this._slots = []
    this._capacity = initialCapacity || 8
    this._deleted = 0
    this.MAX_LOAD_RATIO = 0.9
    this.SIZE_RATIO = 3
  }

  set(key, value) {
    let loadRatio = (this.length + this._deleted + 1) / this.capacity
    if (loadRatio > this.MAX_LOAD_RATIO) {
      this._resize(this._capacity * this.SIZE_RATIO)
    }
    let index = this._findSlot(key)
    this._slots[index] = {
      key: key,
      value: value,
      deleted: false
    };
    this.length++
  }

  load(){
    return this.capacity / this.slots
  }

  _hashString(string) {
    let hash = 5381;
    for (let i =0; i < string.length; i++) {
      //hash = hash * 33 + string.charCodeAt(i);
      hash = (((hash << 5) - hash) + string.charCodeAt(i))
    }
    return hash
  }

  _findSlot(key) {
    let hash = this._hashString(key)
    let start = hash % this._capacity
    for (let i = start; i < start + this._capacity; i++) {
      let index = i % this._capacity
      let slot = this._slots[index]
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index
      }
    }
  }

  _resize(size) {
    let oldSlots = this._slots
    this._capacity = size

    this.length = 0
    this._deleted = 0
    this._slots = []
    for (let i = 0; i < oldSlots.length; i++) {
      let slot = oldSlots[i]
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value)
      }
    }
  }

  remove(key) {
    let index = this._findSlot(key)
    let slot = this._slots[index]
    if (slot === undefined) {
      throw new Error('Key Error')
    }
    slot.deleted = true
    this.length--
    this._deleted++
  }
}

const main = () => {
  let n = 1000000
  let h = new HashMap(n)
  let h2 = new NaiveHashMap(n)
  let h3 = new Map()
  let arr = [[0,1], {test: 'good'}, {happy: ['tree', 0]}, 10000, 'hello']
  console.time('Robinhood HashMap')
  for (let i = 1; i <= n; i++) {
    //console.log(`load factor is: ${h.load()}`)
    h.set((i%400).toString(), arr[Math.floor(Math.random()*5)])
  }
  console.timeEnd('Robinhood HashMap')
  console.time('Naive HashMap')
  for (let i = 0; i < n; i++) {
    h2.set(i.toString(), arr[Math.floor(Math.random()*5)])
  }
  console.timeEnd('Naive HashMap')
  console.time('ES6 Map')
  for (let i = 0; i < n; i++) {
    h3.set(i.toString(), arr[Math.floor(Math.random()*5)])
  }
  console.timeEnd('ES6 Map')
  // console.log('HashMap Keys and Values')
  // h.keys.forEach((k, i) => {
  //   console.log(`${k} => ${h.values[i]}`)
  // })

}

main()
