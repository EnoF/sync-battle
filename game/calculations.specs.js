import 'mocha'
import { getPermutations } from './permutations'
import { calculate } from './calculations'

require('approvals').mocha('./approvals')

describe('Calculations', () => {
  getPermutations({
    p1Hp: [10],
    p1Move: ['attack'],
    p1Stamina: [5],
    p2Hp: [10],
    p2Move: ['attack', 'block', 'dodge'],
    p2Stamina: [5],
  }).forEach(({ p1Hp, p1Move, p1Stamina, p2Hp, p2Move, p2Stamina }) => {
    describe(`when player one uses ${p1Move}`, () => {
      describe(`and has ${p1Hp}hp with ${p1Stamina}stamina`, () => {
        describe(`and player two uses ${p2Move}`, () => {
          describe(`and has ${p2Hp}hp with ${p2Stamina}stamina`, () => {
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
  })
})
