import { expect } from 'chai'
import HashMap from '../../RH-HashMap'

/* CONSTANTS */
// const defaultSetVal = null
/* TESTS */
describe('HashMap', () => {
  describe('#set() should return a boolean value', () => {
    it('should return false when arg k is not of type String', () => {
      const h = new HashMap(10)
      const ti = h.set({ new: 'message' }, 'value') // wrong value
      expect(ti).to.equal(false)
    })

    it('should return true when arg k is of type String', () => {
      const h = new HashMap(10)
      const ti = h.set('newkey', { new: 'message' })
      expect(ti).to.equal(true)
    })

    it('should return true for all values of arg value', () => {
      const h = new HashMap(10)
      const t1 = h.set('k0', { new: 'message' })
      const t2 = h.set('k1', ['hi', 'hi'])
      const t3 = h.set('k2', 'new')
      expect(t1).to.equal(true)
      expect(t2).to.equal(true)
      expect(t3).to.equal(true)
    })
  })
})

// const main = () => {
//   let n = 1000000
//   let h = new HashMap(n)
//   let h2 = new NaiveHashMap(n)
//   let h3 = new Map()
//   let arr = [[0, 1], { test: 'good' }, { happy: ['tree', 0] }, 10000, 'hello']
//   console.time('Robinhood HashMap')
//   for (let i = 1; i <= n; i++) {
//     // console.log(`load factor is: ${h.load()}`)
//     h.set((i % 400).toString(), arr[Math.floor(Math.random() * 5)])
//   }
//   console.timeEnd('Robinhood HashMap')
//   console.time('Naive HashMap')
//   for (let i = 0; i < n; i++) {
//     h2.set(i.toString(), arr[Math.floor(Math.random() * 5)])
//   }
//   console.timeEnd('Naive HashMap')
//   console.time('ES6 Map')
//   for (let i = 0; i < n; i++) {
//     h3.set(i.toString(), arr[Math.floor(Math.random() * 5)])
//   }
//   console.timeEnd('ES6 Map')
//   // console.log('HashMap Keys and Values')
//   // h.keys.forEach((k, i) => {
//   //   console.log(`${k} => ${h.values[i]}`)
//   // })
// }
