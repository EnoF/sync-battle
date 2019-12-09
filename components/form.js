import { Mutation } from 'react-apollo'
import Router from 'next/router'

const onSubmit = ({ action, mutate }) => event => {
  const data = new FormData(event.target)
  const variables = {}
  for (let [key, value] of data.entries()) {
    variables[key] = value
  }
  mutate({ variables })
  Router.push(action)
  event.preventDefault()
}

const Form = ({ mutation, children, action }) => (
  <Mutation mutation={mutation}>
    {(mutate, gqlData) => (
      <form
        action={`/fallback/${action}`}
        method="POST"
        onSubmit={onSubmit({ action, mutate })}
      >
        <input type="hidden" name="mutation" value={mutation.loc.source.body} />
        {children(gqlData)}
      </form>
    )}
  </Mutation>
)

export default Form