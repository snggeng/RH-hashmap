/* eslint no-multi-assign: 0,  no-param-reassign: 0, no-sequences: 0,
no-unexpected-multiline: 0, no-use-before-define: 0, no-bitwise: 0 */

// Naive hashCode function that returns only positive hashCodes
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (((hash << 5) - hash) + str.charCodeAt(i))
  }
  return hash & 0xFFFFFFFF
}

// Format data based on key
export const processKey = (key, map) => [key, hashCode(key, map) % map.size]

// Increment hash value
export const incrementHash = (index, map) => (index + 1) % map.size

// Swap "Rich" and "Poor" slots to decrease variance
export const swapElements = (currentIndex, newIndex, newProbeLength, map) => {
  // Calculate the new probe length for existing element
  let delta = newIndex - currentIndex
  // console.log('new delta ', delta)
  if (delta < 0) { delta = (map.size - currentIndex) + newIndex }
  // Update probes
  map.keys[currentIndex] = [map.keys[currentIndex][0], map.keys[currentIndex][1] + delta]
  map.keys[newIndex] = [map.keys[newIndex][0], newProbeLength]
  let a = map.keys[currentIndex][0]
  let b = map.keys[newIndex][0]
  let c = map.values[currentIndex]
  let d = map.values[newIndex];
  // Swap Elements
  [a, b] = [b, a];
  [c, d] = [d, c];
}

export const clearMap = (map) => {
  // fastest way to empty array keeping var references via jsperf
  while (map.size > 0) {
    map.keys.pop()
    map.values.pop()
    map.size -= 1
  }
}
