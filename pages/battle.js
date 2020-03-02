import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import withData from '../lib/apollo'
import Header from '../components/header'
import Form from '../components/form'
import { getHp, getStamina } from '../game/player'
import { getP1, getP2 } from '../game/players'

export const CALCULATE_ROUND = gql`
  mutation NewRound($p1Hp: Int!, $p1Stamina: Int!, $p1Move: String, $p2Hp: Int!, $p2Stamina: Int!, $p2Move: String) {
    calculate(
      players: {
        p1: { hp: $p1Hp, stamina: $p1Stamina, moves: [{ type: $p1Move }] }
        p2: { hp: $p2Hp, stamina: $p2Stamina, moves: [{ type: $p2Move }] }
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
            <label>
              move:
              <input type="text" name="p1Move" defaultValue="attack" disabled={loading} />
            </label>
            <label>
              hp:
              <input type="number" readOnly name="p2Hp" value={data |> getP2Hp} disabled={loading} />
            </label>
            <label>
              stamina:
              <input type="number" readOnly name="p2Stamina" value={data |> getP2Stamina} disabled={loading} />
            </label>
            <label>
              move:
              <input type="text" name="p2Move" defaultValue="attack" disabled={loading} />
            </label>
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
