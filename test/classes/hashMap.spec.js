import { expect } from 'chai'
import sinon from 'sinon'
import HashMap from '../../RH-HashMap'

/**
 * TESTS
 */

describe('HashMap', () => {
  describe('Constructor', () => {
    it('should be created with four properties: size, capacity, keys, values', () => {
      const sut = new HashMap(1) // sut stands for sys under test
      expect(sut).to.have.property('size')
      expect(sut).to.have.property('capacity')
      expect(sut).to.have.property('keys')
      expect(sut).to.have.property('values')
    })
  })

  describe('#set()', () => {
    it('should return false when arg k is not of type String', () => {
      const h = new HashMap(10)
      const sut = h.set({ new: 'message' }, 'value') // wrong value
      expect(sut).to.equal(false)
    })

    it('should return false when there are no probes', () => {
      const h = new HashMap(10)
      const sut = h.set({ new: 'message' }, 'value') // wrong value
      expect(sut).to.equal(false)
    })

    it('should return true when arg k is of type String', () => {
      const h = new HashMap(10)
      const sut = h.set('newkey', { new: 'message' })
      expect(sut).to.equal(true)
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

    it('should increase capacity if new key is set', () => {
      const h = new HashMap(10)
      h.set('k0', { new: 'message' })
      let sut = h.capacity
      expect(sut).to.equal(1)
      h.set('k1', { new: 'message' })
      sut = h.capacity
      expect(sut).to.equal(2)
    })

    it('should replace current value if key is the same', () => {
      const h = new HashMap(10)
      const val = 'new message'
      h.set('k0', val)
      let sut = h.get('k0')
      expect(sut).to.equal(val)
      h.set('k0', 'even newer message')
      sut = h.get('k0')
      expect(sut).to.equal('even newer message')
    })

    it('should be called', () => {
      const spy = sinon.spy(HashMap.prototype, 'set')
      const h = new HashMap(10)
      h.set('key', 'value')
      expect(spy.called).to.equal(true)
      spy.restore()
    })
    it('should swap elements if elemToSwapFound', () => {
      // const spy = sinon.spy(HashMap.prototype.set, 'swapElements')
      const mock = sinon.mock(HashMap.prototype)
      const expectation = mock.expects('set').atLeast(2)
      const h = new HashMap(10)
      h.set('key', 'value')
      h.set('key', 'value')
      h.set('key', 'value')
      expectation.verify()
      mock.restore()
    })
  })

  describe('#get()', () => {
    it('should return null when arg k is not of type String', () => {
      const h = new HashMap(10)
      h.set('newkey', { new: 'message' })
      let sut = h.get(10) // when k is Number
      expect(sut).to.equal(null)
      sut = h.get({ hello: 'friend' }) // when k is Object
      expect(sut).to.equal(null)
    })
    it('should return the value on successful retrieval of key', () => {
      const h = new HashMap(4)
      h.set('k0', 1)
      let sut = h.get('k0')
      expect(sut).to.equal(1)
      h.set('k1', 2)
      sut = h.get('k1')
      expect(sut).to.equal(2)
      h.set('k1', 3)
      sut = h.get('k1')
      expect(sut).to.equal(3)
      h.set('k2', 4)
      sut = h.get('k2')
      expect(sut).to.equal(4)
    })
    it('should return null of unsuccessful retrieval of key', () => {
      const h = new HashMap(4)
      h.set('k0', 1)
      let sut = h.get('k1')
      expect(sut).to.equal(null)
      h.set('k1', 1000)
      sut = h.get('k2')
      expect(sut).to.equal(null)
    })
  })

  describe('#load()', () => {
    it('should return a float', () => {
      const h = new HashMap(4)
      h.set('k0', 1)
      let sut = h.load()
      expect(sut).to.be.a('number')
      // check for float since in js all Numbers are 64-bit floating points
      sut = Number.isInteger(h.load())
      expect(sut).to.equal(false)
    })
  })

  describe('#clear()', () => {
    it('should clear the map', () => {
      const h = new HashMap(4)
      h.set('k0', 1)
      h.set('k1', 1)
      h.set('k2', 1)
      h.set('k3', 1)
      h.clear()
      const sut = h.length
      expect(sut).to.equal(0)
    })
  })

  describe('#.length', () => {
    it('should return a number', () => {
      const h = new HashMap(4)
      const sut = h.length
      expect(sut).to.be.a('number')
    })
    it('should return the size of the map', () => {
      const h = new HashMap(4)
      const sut = h.length
      expect(sut).to.equal(4)
    })
  })

  describe('#swapElements()', () => {
    it('should recalculate delta if delta < 0', () => {
      const n = 10000
      const h = new HashMap(n)
      const uuid = ['1', 'a', 'c', 'f', '0', 'x', 'f', 'g', 'e', 'd', 'h']
      const arr = [[0, 1], { test: 'good' }, { happy: ['tree', 0] }, 10000, 'hello']
      for (let i = 0; i < n; i++) {
        const k = uuid.reduce((s, c, index) => c + s + uuid[Math.floor(index * Math.random(uuid.length - 1))], '')
        h.set((k).toString(), arr[Math.floor(Math.random() * 4)])
      }
      const keys = h.keys.filter(e => e !== null)
      const key1 = keys[10]
      const key2 = keys[0]
      console.log('key ', key1, key2)
      const currentIndex = h.keys.indexOf(key1)
      const newIndex = h.keys.indexOf(key2)
      const newProbeLength = Math.floor(Math.random() * 10)
      const delta = (h.size - currentIndex) + newIndex
      const sut = h.keys[currentIndex][1]
      console.log(`sut: ${sut}, delta: ${delta}`)
      h.swapElements(currentIndex, newIndex, newProbeLength)
      const sut2 = h.keys[currentIndex][1]
      console.log(sut2)
      expect(sut2).to.be.equal(sut + delta)
    })
    it('should swap keys based on new delta', () => {
      const n = 10000
      const h = new HashMap(n)
      const uuid = ['1', 'a', 'c', 'f', '0', 'x', 'f', 'g', 'e', 'd', 'h']
      const arr = [[0, 1], { test: 'good' }, { happy: ['tree', 0] }, 10000, 'hello']
      for (let i = 0; i < n; i++) {
        const k = uuid.reduce((s, c, index) => c + s + uuid[Math.floor(index * Math.random(uuid.length - 1))], '')
        h.set((k).toString(), arr[Math.floor(Math.random() * 4)])
      }
      const keys = h.keys.filter(e => e !== null)
      const key1 = keys[0] // smaller index
      const key2 = keys[10]
      console.log(`key: ${key1}`)
      const currentIndex = h.keys.indexOf(key1)
      const newIndex = h.keys.indexOf(key2)
      const newProbeLength = Math.floor(Math.random() * 10)
      const sut = h.keys[currentIndex]
      h.swapElements(currentIndex, newIndex, newProbeLength)
      const sut2 = h.keys[currentIndex]
      expect(sut2).to.not.be.equal(sut)
    })
    it('should be called if elemToSwapFound is true', () => {
      const spy = sinon.spy(HashMap.prototype, 'swapElements')
      const n = 10000
      const h = new HashMap(n)
      const uuid = ['1', 'a', 'c', 'f', '0', 'x', 'f', 'g', 'e', 'd', 'h']
      for (let i = 0; i < n; i++) {
        const k = uuid.reduce((s, c, index) => c + s + uuid[Math.floor(index * Math.random(uuid.length - 1))], '')
        h.set((k).toString(), 'value')
      }
      expect(spy.called).to.equal(true)
      spy.restore()
    })
  })
})
