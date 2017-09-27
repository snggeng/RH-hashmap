/* eslint no-multi-assign: 0,  no-param-reassign: 0, no-sequences: 0,
no-unexpected-multiline: 0, no-use-before-define: 0, no-bitwise: 0 */

// Naive hashCode function that returns only positive hashCodes
export const hashCode = (str) => {
  let hash = 5381 // random prime number
  for (let i = 0; i < str.length; i += 1) {
    hash = (((hash << 5) - hash) + str.charCodeAt(i))
  }
  return hash & 0xFFFFFFFF
}

// Format data based on key
export const processKey = (key, map) => [key, hashCode(key, map) % map.size]

// Increment hash value
export const incrementHash = (index, map) => (index + 1) % map.size

export const clearMap = (map) => {
  // fastest way to empty array keeping var references via jsperf
  while (map.size > 0) {
    map.keys.pop()
    map.values.pop()
    map.size -= 1
  }
}
