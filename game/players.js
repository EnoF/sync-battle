import { addStamina, removeMoves } from './player'

export const getP1 = players => players.p1
export const getP2 = players => players.p2
export const addStaminaToPlayers = players => ({
  p1: players |> getP1 |> addStamina,
  p2: players |> getP2 |> addStamina,
})

export const removeMovesFromPlayers = players => ({
  p1: players |> getP1 |> removeMoves,
  p2: players |> getP2 |> removeMoves,
})
