import { calculate } from './calculations'
import { getMoves, appendMove } from './player'
import { getP1, getP2, addStaminaToPlayers, removeMovesFromPlayers } from './players'

const calculateRounds = players => {
  const p1Moves = players |> getP1 |> getMoves
  const p2Moves = players |> getP2 |> getMoves
  return p1Moves.reduce(
    (calculatedPlayers, move, index) =>
      calculate({
        p1: calculatedPlayers |> getP1 |> appendMove(move),
        p2: calculatedPlayers |> getP2 |> appendMove(p2Moves[index]),
      }),
    players
  )
}
export const round = players => players |> calculateRounds |> addStaminaToPlayers |> removeMovesFromPlayers
