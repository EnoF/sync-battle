import 'mocha'
import { expect } from 'chai'
import { convertJSONValuesToNumbers } from './fallback'

describe('JSON value conversions', () => {
  describe('when converting a json with nested json objects', () => {
    let result = null
    before(() => {
      result = convertJSONValuesToNumbers({
        a: '1',
        b: {
          c: '2'
        },
        d: ['3'],
        e: [{
          f: '4'
        }]
      })
    })
    it('should convert the first level values', () => {
      expect(result.a).to.equal(1)
    })
    it('should convert the inner level values', () => {
      expect(result.b.c).to.equal(2)
    })
    it('should convert the array values', () => {
      expect(result.d).to.deep.equal([3])
    })
    it('should convert the array object values', () => {
      expect(result.e[0].f).to.equal(4)
    })
  })
})
