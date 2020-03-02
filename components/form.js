import { Mutation } from 'react-apollo'
import Router from 'next/router'

const getNumber = value => parseFloat(value) || value
const onSubmit = ({ action, mutate }) => event => {
  const data = new FormData(event.target)
  const variables = {}
  for (let [key, value] of data.entries()) {
    variables[key] = value |> getNumber
  }
  mutate({ variables })
  Router.push(action)
  event.target.reset()
  event.preventDefault()
}

const Form = ({ mutation, children, action, ...props }) => (
  <Mutation mutation={mutation}>
    {(mutate, gqlData) => (
      <form
        {...props}
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
