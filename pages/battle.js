import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import withData from '../lib/apollo'
import Header from '../components/header'
import Form from '../components/form'
import { getHp, getStamina } from '../game/player'
import { getP1, getP2 } from '../game/players'
import material from 'materialize-css/sass/materialize.scss'

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
    <style jsx>{`
      .move {
        display: block;
      }
      .move:invalid + .move {
        display: none;
      }
      .move option:checked:not([value='attack']) ~ .move {
        display: block;
      }
    `}</style>
    {[1, 2, 3, 4, 5].map(index => (
      <select
        key={index}
        className="browser-default move"
        type="text"
        name={`${player}Move${index}`}
        defaultValue=""
        disabled={loading}
        required
      >
        <option value="" disabled>
          select move
        </option>
        <option value="pass">pass</option>
        <option value="attack">attack</option>
        <option value="block">block</option>
        <option value="dodge">dodge</option>
      </select>
    ))}
  </>
)
const Battle = () => (
  <main>
    <style jsx>{`
      fieldset {
        border: none;
      }
      fieldset:invalid + fieldset {
        display: none;
      }
      fieldset:not(:invalid) {
        display: none;
      }
      fieldset:invalid + .confirmation {
        display: none;
      }
    `}</style>
    <Header />
    <article className="container">
      <section>
        <h1>Battle</h1>
      </section>
      <section>
        <h1>Round</h1>
        <Form action="/battle" mutation={CALCULATE_ROUND} className="row">
          {({ loading, data }) => (
            <>
              {!!loading && <div>Calculating...</div>}
              <div className="card col s6">
                <div className="card-content">
                  <p>Player 1:</p>
                  <label>
                    hp:
                    <input type="number" readOnly name="p1Hp" value={data |> getP1Hp} disabled={loading} />
                  </label>
                  <label>
                    stamina:
                    <input type="number" readOnly name="p1Stamina" value={data |> getP1Stamina} disabled={loading} />
                  </label>
                </div>
              </div>
              <div className="card col s6">
                <div className="card-content">
                  <p>Player 2:</p>
                  <label>
                    hp:
                    <input type="number" readOnly name="p2Hp" value={data |> getP2Hp} disabled={loading} />
                  </label>
                  <label>
                    stamina:
                    <input type="number" readOnly name="p2Stamina" value={data |> getP2Stamina} disabled={loading} />
                  </label>
                </div>
              </div>
              <fieldset>
                <div className="card col s6">
                  <div className="card-content">
                    <h3>Player 1</h3>
                    <Moves player="p1" loading={loading} />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div className="card col s6">
                  <div className="card-content">
                    <h3>Player 2</h3>
                    <Moves player="p2" loading={loading} />
                  </div>
                </div>
              </fieldset>
              <div className="col s12 confirmation">
                <button className="btn waves-effect waves-light" type="submit" name="action" disabled={loading}>
                  calculate
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </>
          )}
        </Form>
      </section>
    </article>
  </main>
)

export default withData(Battle)
