import HashMap from './RH-HashMap'
import NaiveHashMap from './OA-HashMap'

const main = () => {
  const n = 1000000
  const h = new HashMap(n)
  const h2 = new NaiveHashMap(n)
  const h3 = new Map()
  const uuid = ['1', 'a', 'c', 'f', '0', 'x', 'f', 'g', 'e', 'd', 'h']
  const arr = [[0, 1], { test: 'good' }, { happy: ['tree', 0] }, 10000, 'hello']

  let used = process.memoryUsage().heapUsed / 1024 / 1024;
  // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  // Begin for RH
  console.time('Robinhood HashMap')
  for (let i = 0; i < n; i++) {
    const k = uuid.reduce((s, c, index) => c + s + uuid[Math.floor(index * Math.random(uuid.length - 1))], '')
    // console.log(k)
    h.set((k).toString(), arr[Math.floor(Math.random() * 5)])
  //  h.get(i)
  }
  console.timeEnd('Robinhood HashMap')
  console.log(h.load())
  used = (Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100) - used;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  // Begin for Naive
  console.time('Naive HashMap')
  for (let i = 0; i < n; i++) {
    const k = uuid.reduce((s, c, index) => c + s + uuid[Math.floor(index * Math.random(uuid.length - 1))], '')
    h2.set((k).toString(), arr[Math.floor(Math.random() * 5)])
    // h.get(i)
  }
  console.timeEnd('Naive HashMap')
  used = (Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100) - used;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  // Begin for ES6
  console.time('ES6 Map')
  for (let i = 0; i < n; i++) {
    const k = uuid.reduce((s, c, index) => c + s + uuid[Math.floor(index * Math.random(uuid.length - 1))], '')
    h3.set((k).toString(), arr[Math.floor(Math.random() * 5)])
    // h.get(i)
  }
  console.timeEnd('ES6 Map')
  used = (Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100) - used;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  /* Uncomment to check values in map */
  // console.log('HashMap Keys and Values')
  // h.keys.forEach((k, i) => {
  //   if (k) {
  //     console.log(`${k} => ${h.values[i]}, ${h.length}`)
  //   }
  // })
}

// Run test
main()
