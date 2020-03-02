import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import withData from '../lib/apollo'
import Header from '../components/header'
import Form from '../components/form'
import { getHp, getStamina } from '../game/player'
import { getP1, getP2 } from '../game/players'

export const CALCULATE_ROUND = gql`
  mutation NewRound(
    $p1Hp: Int!
    $p1Stamina: Int!
    $p1Move1: String
    $p1Move2: String
    $p1Move3: String
    $p1Move4: String
    $p1Move5: String
    $p2Hp: Int!
    $p2Stamina: Int!
    $p2Move1: String
    $p2Move2: String
    $p2Move3: String
    $p2Move4: String
    $p2Move5: String
  ) {
    calculate(
      players: {
        p1: {
          hp: $p1Hp
          stamina: $p1Stamina
          moves: [{ type: $p1Move1 }, { type: $p1Move2 }, { type: $p1Move3 }, { type: $p1Move4 }, { type: $p1Move5 }]
        }
        p2: {
          hp: $p2Hp
          stamina: $p2Stamina
          moves: [{ type: $p2Move1 }, { type: $p2Move2 }, { type: $p2Move3 }, { type: $p2Move4 }, { type: $p2Move5 }]
        }
      }
    ) {
      p1 {
        hp
        stamina
      }
      p2 {
        hp
        stamina
      }
    }
  }
`

const getDefaultPlayerData = () => ({
  p1: {
    hp: 10,
    stamina: 5,
  },
  p2: {
    hp: 10,
    stamina: 5,
  },
})
const getPlayerData = (data = {}) => data.calculate || getDefaultPlayerData()
const getP1Data = data => data |> getPlayerData |> getP1
const getP2Data = data => data |> getPlayerData |> getP2
const getP1Hp = data => data |> getP1Data |> getHp
const getP1Stamina = data => data |> getP1Data |> getStamina
const getP2Hp = data => data |> getP2Data |> getHp
const getP2Stamina = data => data |> getP2Data |> getStamina
const Moves = ({ player, loading }) => (
  <>
    {[1, 2, 3, 4, 5].map(index => (
      <label>
        move {index}:
        <input type="text" name={`${player}Move${index}`} defaultValue="attack" disabled={loading} />
      </label>
    ))}
  </>
)
const Battle = () => (
  <main>
    <Header />
    <section>
      <h1>Battle</h1>
    </section>
    <section>
      <h1>Round</h1>
      <Form action="/battle" mutation={CALCULATE_ROUND}>
        {({ loading, data }) => (
          <>
            {!!loading && <div>Calculating...</div>}
            <label>
              hp:
              <input type="number" readOnly name="p1Hp" value={data |> getP1Hp} disabled={loading} />
            </label>
            <label>
              stamina:
              <input type="number" readOnly name="p1Stamina" value={data |> getP1Stamina} disabled={loading} />
            </label>
            <Moves player="p1" loading={loading} />
            <label>
              hp:
              <input type="number" readOnly name="p2Hp" value={data |> getP2Hp} disabled={loading} />
            </label>
            <label>
              stamina:
              <input type="number" readOnly name="p2Stamina" value={data |> getP2Stamina} disabled={loading} />
            </label>
            <Moves player="p2" loading={loading} />
            <button type="submit" disabled={loading}>
              calculate
            </button>
          </>
        )}
      </Form>
    </section>
  </main>
)

export default withData(Battle)
