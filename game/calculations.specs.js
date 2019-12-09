import 'mocha'
import { getPermutations } from './permutations'
import { calculate } from './calculations'

require('approvals').mocha('./approvals')

describe('Calculations', () => {
  getPermutations({
    p1Hp: [10, 9],
    p1Move: ['attack'],
    p1Stamina: [5],
    p2Hp: [10, 9],
    p2Move: ['attack'],
    p2Stamina: [5],
  }).forEach(({ p1Hp, p1Move, p1Stamina, p2Hp, p2Move, p2Stamina }) => {
    describe(`when player one uses ${p1Move} with ${p1Hp} left`, () => {
      describe(`and player two uses ${p2Move} with ${p2Hp} left`, () => {
        it(`should reduce player two's hp`, function() {
          this.verifyAsJSON(
            calculate({
              p1: {
                hp: p1Hp,
                stamina: p1Stamina,
                move: p1Move,
              },
              p2: {
                hp: p2Hp,
                stamina: p2Stamina,
                move: p2Move,
              },
            })
          )
        })
      })
    })
  })
})
