import 'mocha'
import { expect } from 'chai'
import { round } from './battle-round'

const getBeginningPlayer = () => ({
  hp: 10,
  stamina: 5,
})
const getNearDeathPlayer = () => ({
  hp: 1,
  stamina: 5,
})
const getFiveAttacks = () => [
  {
    type: 'attack',
  },
  {
    type: 'attack',
  },
  {
    type: 'attack',
  },
  {
    type: 'attack',
  },
  {
    type: 'attack',
  },
]
describe('Battle round', () => {
  describe('when the round is over', () => {
    const p1 = getBeginningPlayer()
    const p2 = getBeginningPlayer()
    const fiveAttacks = getFiveAttacks()
    it('should replenish some of the stamina to the players.js', () => {
      expect(
        round({
          p1: {
            ...p1,
            moves: fiveAttacks,
          },
          p2: {
            ...p2,
            moves: fiveAttacks,
          },
        })
      ).to.deep.equal({
        p1: {
          hp: 5,
          stamina: 5,
        },
        p2: {
          hp: 5,
          stamina: 5,
        },
      })
    })
  })
  describe('when one of the players.js hp is reduced to zero', () => {
    const p1 = getNearDeathPlayer()
    const p2 = getBeginningPlayer()
    const fiveAttacks = getFiveAttacks()
    it('should stop executing any other moves', () => {
      expect(
        round({
          p1: {
            ...p1,
            moves: fiveAttacks,
          },
          p2: {
            ...p2,
            moves: fiveAttacks,
          },
        })
      ).to.deep.equal({
        p1: {
          hp: 0,
          stamina: 4,
        },
        p2: {
          hp: 9,
          stamina: 4,
        },
      })
    })
  })
})
