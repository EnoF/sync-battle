import fetch from 'node-fetch'
import ApolloClient, { gql } from 'apollo-boost'

const { createHttpLink } = require('apollo-link-http')

const redirectWith = res => url => {
  res.writeHead(302, {
    Location: url,
  })
  res.end()
}

export default (req, res) => {
  const { headers, body } = req
  const uri = `${headers['x-forwarded-proto']}://${headers['x-forwarded-host']}`
  const redirectTo = redirectWith(res)

  const { mutation, ...variables } = body
  if (!mutation) return redirectTo(`${uri}/`)

  const MUTATION = gql(mutation)
  const client = new ApolloClient({
    credentials: 'same-origin',
    uri: `${uri}/graphql`,
    fetch,
  })
  client.mutate({
    mutation: MUTATION,
    variables,
  })
  redirectTo(`${uri}/`)
}
