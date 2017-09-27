import { expect } from 'chai'
import HashMap from '../../RH-HashMap'
import { clearMap, processKey } from '../../utils'

/**
 * TESTS
 */
describe('Utils', () => {
  describe('#clearMap()', () => {
    it('should clear a map and its keys, values and size', () => {
      const h = {
        keys: [0, 1, 2, 3],
        values: [0, 1, 2, 3],
        size: 4,
      }
      clearMap(h)
      const sut = h
      expect(sut).to.have.property('size')
      expect(sut.size).to.equal(0)
    })
  })

  describe('#processKey', () => {
    it('should return an array', () => {
      const map = new HashMap(1)
      map.set('key', 100)
      const sut = processKey('key 2', map)
      expect(sut).to.be.an('array')
    })
    it('should return an array with [String, Number]', () => {
      const map = new HashMap(1)
      map.set('key', 100)
      const [sut1, sut2] = processKey('key 2', map)
      expect(sut1).to.be.a('string')
      expect(sut2).to.be.a('number')
    })
  })
})
