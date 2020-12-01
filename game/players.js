import { addStamina, isDefeated, removeMoves } from './player'

export const getP1 = players => players.p1
export const getP2 = players => players.p2

export const isGameOver = players => (players |> getP1 |> isDefeated) || (players |> getP2 |> isDefeated)
export const addStaminaToPlayers = players => {
  if (players |> isGameOver) return players
  return {
    p1: players |> getP1 |> addStamina,
    p2: players |> getP2 |> addStamina,
  }
}

export const removeMovesFromPlayers = players => ({
  p1: players |> getP1 |> removeMoves,
  p2: players |> getP2 |> removeMoves,
})
