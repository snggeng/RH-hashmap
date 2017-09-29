import HashMap from './RH-HashMap'
import NaiveHashMap from './OA-HashMap'

const runSet = (name, m, n, time, space) => {
  const uuid = ['1', 'a', 'c', 'f', '0', 'x', 'f', 'g', 'e', 'd', 'h']
  const arr = [[0, 1], { test: 'good' }, { happy: ['tree', 0] }, 10000, 'hello']
  // Begin for Naive
  console.time(`${name}`)
  const t0 = new Date().getTime()
  for (let i = 0; i < n; i++) {
    const k = uuid.reduce((s, c, index) => c + s + uuid[Math.floor(index * Math.random(uuid.length - 1))], '')
    m.set((k).toString(), arr[Math.floor(Math.random() * 5)])
  }
  console.timeEnd(`${name}`)
  const t1 = new Date().getTime()
  time.push(t1 - t0)
  const used = (Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100);
  // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  space.push(Math.round(used * 100) / 100)
}

const runGet = (name, m, n, time, space) => {
  // const uuid = ['1', 'a', 'c', 'f', '0', 'x', 'f', 'g', 'e', 'd', 'h']
  const arr = [[0, 1], { test: 'good' }, { happy: ['tree', 0] }, 10000, 'hello']

  // Set Map
  for (let i = 0; i < n; i++) {
    const k = `avjsdadkjhdjsadjksakd${i}`
    m.set((k).toString(), arr[Math.floor(Math.random() * 5)])
  }
  console.time(`${name}`)
  const t0 = new Date().getTime()
  // Get map
  const k = `avjsdadkjhdjsadjksakd${Math.floor(Math.random() * n)}`
  m.get(k)
  const t1 = new Date().getTime()
  console.timeEnd(`${name}`)
  time.push(t1 - t0)
  const used = (Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100);
  // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  space.push(Math.round(used * 100) / 100)
}

const median = (sequence) => {
  sequence.sort() // note that direction doesn't matter
  return sequence[Math.ceil(sequence.length / 2)];
}

const average = sequence => Math.ceil(sequence.reduce((a, b) => a + b) / sequence.length)

const testSetMethod = () => {
  const n = 1000000 // size of map
  let time = []
  let space = []

  // RH Map
  console.log('************ BEGIN RH **************')
  for (let i = 0; i < 10; i++) {
    const h = new HashMap(n)
    runSet(`RobinHood HashMap ${i}`, h, n, time, space)
  }
  console.log('RH : Average time', average(time).toFixed(4), 'milliseconds')
  console.log('RH : Average space', average(space).toFixed(4), 'MB')
  console.log('RH : Median time', median(time).toFixed(4), 'milliseconds')
  console.log('RH : Median space', median(space).toFixed(4), 'MB')
  console.log('\n')
  time = []
  space = []

  // Naive Map
  console.log('************ BEGIN NAIVE **************')
  for (let i = 0; i < 10; i++) {
    const h = new NaiveHashMap(n)
    runSet(`Naive HashMap ${i}`, h, n, time, space)
  }
  console.log('Naive : Average time', average(time).toFixed(4), 'milliseconds')
  console.log('Naive : Average space', average(space).toFixed(4), 'MB')
  console.log('Naive : Median time', median(time).toFixed(4), 'milliseconds')
  console.log('Naive : Median space', median(space).toFixed(4), 'MB')
  console.log('\n')
  time = []
  space = []

  // ES6 Map
  console.log('************ BEGIN ES6 **************')
  for (let i = 0; i < 10; i++) {
    const h = new Map()
    runSet(`ES6 HashMap ${i}`, h, n, time, space)
  }
  console.log('ES6 : Average time', average(time).toFixed(4), 'milliseconds')
  console.log('ES6 : Average space', average(space).toFixed(4), 'MB')
  console.log('ES6 : Median time', median(time).toFixed(4), 'milliseconds')
  console.log('ES6 : Median space', median(space).toFixed(4), 'MB')
  console.log('\n')
  /* Uncomment to check values in map */
  // console.log('HashMap Keys and Values')
  // h.keys.forEach((k, i) => {
  //   if (k) {
  //     console.log(`${k} => ${h.values[i]}, ${h.length}`)
  //   }
  // })
}

// testGet
const testGetMethod = () => {
  const n = 10
  let time = []
  let space = []
  // RH Map
  console.log('************ BEGIN RH **************')
  const h1 = new HashMap(n)
  for (let i = 0; i < n; i++) {
    runGet(`RobinHood HashMap ${i}`, h1, n, time, space)
  }
  console.log('RH : Average time', average(time).toFixed(4), 'milliseconds')
  console.log('RH : Average space', average(space).toFixed(4), 'MB')
  console.log('RH : Median time', median(time).toFixed(4), 'milliseconds')
  console.log('RH : Median space', median(space).toFixed(4), 'MB')
  console.log('\n')
  time = []
  space = []

  // Naive Map
  console.log('************ BEGIN NAIVE **************')
  const h2 = new NaiveHashMap(n)
  for (let i = 0; i < n; i++) {
    runGet(`Naive HashMap ${i}`, h2, n, time, space)
  }
  console.log('Naive : Average time', average(time).toFixed(4), 'milliseconds')
  console.log('Naive : Average space', average(space).toFixed(4), 'MB')
  console.log('Naive : Median time', median(time).toFixed(4), 'milliseconds')
  console.log('Naive : Median space', median(space).toFixed(4), 'MB')
  console.log('\n')
  time = []
  space = []

  // ES6 Map
  console.log('************ BEGIN ES6 **************')
  const h3 = new Map()
  for (let i = 0; i < n; i++) {
    runGet(`ES6 HashMap ${i}`, h3, n, time, space)
  }
  console.log('ES6 : Average time', average(time).toFixed(4), 'milliseconds')
  console.log('ES6 : Average space', average(space).toFixed(4), 'MB')
  console.log('ES6 : Median time', median(time).toFixed(4), 'milliseconds')
  console.log('ES6 : Median space', median(space).toFixed(4), 'MB')
  console.log('\n')
}
// testLoad

// Run tests
testSetMethod()
// testGetMethod()
