import { calculate } from './calculations'

const getMoves = player => player.moves
const getP1 = players => players.p1
const getP2 = players => players.p2
const getStamina = player => player.stamina
const appendMove = move => player => ({ ...player, move })
const sum = x => y => x + y
const addStamina = player => ({
  ...player,
  stamina: player |> getStamina |> sum(5),
})
const addStaminaToPlayers = players => ({
  p1: players |> getP1 |> addStamina,
  p2: players |> getP2 |> addStamina,
})
const removeMoves = ({ moves, ...player }) => ({ ...player })
const removeMovesFromPlayers = players => ({
  p1: players |> getP1 |> removeMoves,
  p2: players |> getP2 |> removeMoves,
})
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
