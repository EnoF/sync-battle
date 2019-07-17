import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import withData from '../lib/apollo'
import Header from '../components/header'
import Form from '../components/form'

export const LOGIN = gql`
  mutation Login($userName: String, $password: String) {
    login(userName: $userName, password: $password)
    setUserName(userName: $userName) @client
  }
`

export const USER_NAME = gql`{ userName @client }`

const Login = () => (
  <Query query={USER_NAME}>
    {({ data }) => (
      <main>
        <Header />
        {!!data.userName && (
          <section>
            <h1>{data.userName}</h1>
          </section>
        )}
        {!data.userName && (
          <section>
            <h1>Login</h1>
            <Form
              action="/"
              mutation={LOGIN}
            >
              {({ loading }) => (
                <>
                  {!!loading && <div>Logging in...</div>}
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
                  <button type="submit" disabled={loading}>
                    login
                  </button>
                </>
              )}
            </Form>
          </section>
        )}
      </main>
    )}
  </Query>
)

export default withData(Login)
