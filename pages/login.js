import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Header from '../components/header'
import withData from '../lib/apollo'

export const LOGIN = gql`
  mutation Login($userName: String, $password: String) {
    login(userName: $userName, password: $password)
  }
`
const Login = props => (
  <Mutation mutation={LOGIN}>
    {(login, { data, error, loading }) => (
      <main>
        <Header />
        {!!data && (
          <section>
            <h1>{data.login}</h1>
          </section>
        )}
        {!data && (
          <section>
            <h1>Login</h1>
            {!!loading && <div>Logging in...</div>}
            <form
              action="/fallback/"
              method="POST"
              onSubmit={event => {
                const data = new FormData(event.target)
                const variables = {}
                for (let [key, value] of data.entries()) {
                  variables[key] = value
                }
                login({ variables })
                event.preventDefault()
              }}
            >
              <input
                type="hidden"
                name="mutation"
                value={LOGIN.loc.source.body}
              />
              <label>
                user:
                <input type="text" name="userName" disabled={loading} />
              </label>
              <label>
                password:
                <input type="password" name="password" disabled={loading} />
              </label>
              <button type="submit" disabled={loading}>login</button>
            </form>
          </section>
        )}
      </main>
    )}
  </Mutation>
)

export default withData(Login)
