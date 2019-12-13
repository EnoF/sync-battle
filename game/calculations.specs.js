import 'mocha'
import { getPermutations } from './permutations'
import { calculate } from './calculations'
import approvals from 'approvals'
approvals.configure({
  forceApproveAll: !!process.env.FORCE_APPROVE,
})

describe('Calculations', () => {
  getPermutations({
    p1Hp: [10],
    p1Move: [{ type: 'attack' }],
    p1Stamina: [5],
    p2Hp: [10],
    p2Move: [{ type: 'attack' }, { type: 'attack', power: 3 }, { type: 'block' }, { type: 'dodge' }],
    p2Stamina: [5, 1, 0],
  }).forEach(({ p1Move, p2Move, ...permutation }) => {
    const { p1Hp, p1Stamina, p2Hp, p2Stamina } = permutation
    describe(`when player one uses ${p1Move.type}`, () => {
      describe(`and has ${p1Hp}hp with ${p1Stamina}stamina`, () => {
        describe(`and player two uses ${p2Move.type} with ${p2Move.power} power`, () => {
          describe(`and has ${p2Hp}hp with ${p2Stamina}stamina`, () => {
            it(`should reduce player two's hp`, function() {
              approvals.verifyAsJSON(
                __dirname + '/../approvals',
                [
                  'calculations-',
                  ...Object.values(permutation),
                  ...Object.values(p1Move),
                  ...Object.values(p2Move),
                ].join('-'),
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
