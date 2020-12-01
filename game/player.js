export const getHp = player => player.hp
export const getStamina = player => player.stamina
export const getMove = player => player.move
export const getMoves = player => player.moves
export const getType = move => move.type
export const isDefeated = player => (player |> getHp) <= 0
export const getPower = move => {
  if (move |> getType |> equals('idle')) return 0
  return move.power || 1
}
export const getDamage = move => {
  if (move |> getType |> notEquals('attack')) return 0
  return move |> getPower
}
export const appendMove = move => player => ({ ...player, move })
export const removeMoves = ({ moves, ...player }) => ({ ...player })
export const removeMove = ({ move, ...player }) => ({
  ...player,
})
export const addStamina = player => ({
  ...player,
  stamina: player |> getStamina |> sum(5),
})
export const reduceStamina = damage => player => {
  const stamina = player |> getStamina
  return {
    ...player,
    stamina: stamina - damage |> minZero,
  }
}
export const reduceHp = damage => player => {
  const hp = player |> getHp
  return {
    ...player,
    hp: hp - damage |> minZero,
  }
}
export const setMove = type => player => ({
  ...player,
  move: {
    type: 'idle',
  },
})

// Utils
const sum = x => y => x + y
const minZero = number => {
  if (number < 0) return 0
  return number
}
export const equals = expected => actual => expected === actual
export const notEquals = expected => actual => expected !== actual
