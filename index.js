import HashMap from './RH-HashMap'
import NaiveHashMap from './OA-HashMap'
const main = () => {
  let n = 1000000
  let h = new HashMap(n)
  let h2 = new NaiveHashMap(n)
  let h3 = new Map()
  let arr = [[0, 1], { test: 'good' }, { happy: ['tree', 0] }, 10000, 'hello']
  console.time('Robinhood HashMap')
  for (let i = 1; i <= n; i++) {
    // console.log(`load factor is: ${h.load()}`)
    h.set((i % 400).toString(), arr[Math.floor(Math.random() * 5)])
  }
  console.timeEnd('Robinhood HashMap')
  console.time('Naive HashMap')
  for (let i = 0; i < n; i++) {
    h2.set(i.toString(), arr[Math.floor(Math.random() * 5)])
  }
  console.timeEnd('Naive HashMap')
  console.time('ES6 Map')
  for (let i = 0; i < n; i++) {
    h3.set(i.toString(), arr[Math.floor(Math.random() * 5)])
  }
  console.timeEnd('ES6 Map')
  console.log('HashMap Keys and Values')
  // h.keys.forEach((k, i) => {
  //   console.log(`${k} => ${h.values[i]}, ${h.length}`)
  // })
}

// Run test
main()
