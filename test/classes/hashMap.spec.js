import { expect } from 'chai'
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

    it('should increment hash if a key exists', () => {
      const h = new HashMap(10)
      const val = 'message'
      h.set('k0', val)
      h.set('k1', val)
      h.set('k1', val)
      h.set('k1', 'hi')
      const v = h.get('k1')
      const sut = h.keys
      console.log(sut)
      console.log(v)
      expect(sut).to.equal('even newer message')
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

  describe('#getter length', () => {
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
})
