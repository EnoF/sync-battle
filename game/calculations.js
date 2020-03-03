import {
  getMove,
  reduceHp,
  getStamina,
  getType,
  getPower,
  getDamage,
  notEquals,
  removeMove,
  reduceStamina,
  setMove,
} from './player'
const setMoveToIdle = setMove('idle')
const reduceMoveCost = player => {
  const stamina = player |> getStamina
  const power = player |> getMove |> getPower
  if (power > stamina) return player |> setMoveToIdle
  return player |> reduceStamina(power)
}
const reduceBlockCost = opponent => player => {
  const type = player |> getMove |> getType
  if (player |> getMove |> getType |> notEquals('block')) return player
  const stamina = player |> getStamina
  const opponentPower = opponent |> getMove |> getDamage
  if (stamina < opponentPower) return player |> setMoveToIdle
  return player |> reduceStamina(opponentPower)
}
const inflictDamage = opponent => player => {
  const damage = opponent |> reduceMoveCost |> reduceBlockCost(player) |> getMove |> getDamage
  const move = player |> getMove |> getType
  if (move === 'block' || move === 'dodge') return player
  return player |> reduceHp(damage)
}
const reduceBlockedAttackCost = opponent => player => {
  if (player |> getMove |> getType |> notEquals('attack')) return player
  if (opponent |> getMove |> getType |> notEquals('block')) return player
  const opponentStamina = opponent |> reduceMoveCost |> getStamina
  const damage = player |> getMove |> getDamage
  if (damage > opponentStamina) return player
  return player |> reduceStamina(damage + 1)
}
export const calculate = ({ p1, p2 }) => ({
  p1: p1 |> reduceMoveCost |> reduceBlockCost(p2) |> reduceBlockedAttackCost(p2) |> inflictDamage(p2) |> removeMove,
  p2: p2 |> reduceMoveCost |> reduceBlockCost(p1) |> reduceBlockedAttackCost(p1) |> inflictDamage(p1) |> removeMove,
})
