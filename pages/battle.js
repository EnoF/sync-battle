import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import withData from '../lib/apollo'
import Header from '../components/header'
import Form from '../components/form'

export const CALCULATE_ROUND = gql`
  mutation NewRound($p1Hp: Int!, $p1Stamina: Int!, $p1Move: String, $p2Hp: Int!, $p2Stamina: Int!, $p2Move: String) {
    calculate(players: { p1: {
      hp: $p1Hp,
      stamina: $p1Stamina,
      moves: [{
        type: $p1Move
      }],
    }, p2: {
      hp: $p2Hp,
      stamina: $p2Stamina,
      moves: [{
        type: $p2Move
      }],
    } }) {
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

const Battle = () => (
  <main>
    <Header />
    <section>
      <h1>Battle</h1>
    </section>
    <section>
      <h1>Round</h1>
      <Form action="/battle" mutation={CALCULATE_ROUND}>
        {({ loading }) => (
          <>
            {!!loading && <div>Calculating...</div>}
            <label>
              hp:
              <input type="number" name="p1Hp" value="10" disabled={loading} />
            </label>
            <label>
              stamina:
              <input type="number" name="p1Stamina" value="5" disabled={loading} />
            </label>
            <label>
              move:
              <input type="text" name="p1Move" value="attack" disabled={loading} />
            </label>
            <label>
              hp:
              <input type="number" name="p2Hp" value="10" disabled={loading} />
            </label>
            <label>
              stamina:
              <input type="number" name="p2Stamina" value="5" disabled={loading} />
            </label>
            <label>
              move:
              <input type="text" name="p2Move" value="attack" disabled={loading} />
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
