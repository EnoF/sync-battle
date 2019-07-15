import Header from '../components/header'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Login($userName: String, $password: String) {
    login(userName: $userName, password: $password) 
  }
`
console.log(LOGIN.loc.source.body)

export default props => (
  <main>
    <Header />
    <section>
      <h1>Login</h1>
      <form action="/fallback/" method="POST">
        <input type="hidden" name="mutation" value={LOGIN.loc.source.body} />
        <label>
          user:
          <input type="text" name="userName" />
        </label>
        <label>
          password:
          <input type="password" name="password" />
        </label>
        <button type="submit">login</button>
      </form>
    </section>
  </main>
)
