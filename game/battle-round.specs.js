import 'mocha'
import { expect } from 'chai'
import { round } from './battle-round'

describe('Battle round', () => {
  const p1 = { hp: 10, stamina: 5 }
  const p2 = { hp: 10, stamina: 5 }
  describe('when the round is over', () => {
    const fiveAttacks = [
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
    it('should replenish some of the stamina to the players', () => {
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
  describe('when one of the players hp is reduced to zero', () => {
    it('should stop executing any other moves')
  })
})
