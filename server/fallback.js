import { parse } from 'url'
import fetch from 'node-fetch'
import ApolloClient, { gql } from 'apollo-boost'
import Mutation from '../lib/mutations'

const redirectWith = res => (error, url) => {
  if (!!error) console.error(error)
  res.writeHead(302, {
    Location: url,
  })
  res.end()
}

const getConvertedValue = value => {
  const number = value |> parseFloat
  if (isNaN(number)) return value
  return number
}

const convertArrayValuesToInt = array =>
  array.map(value => {
    if (Array.isArray(value)) return convertArrayValuesToInt(value)
    if (typeof value === 'object') return convertJSONValuesToNumbers(value)
    return value |> getConvertedValue
  })

const convertJSONEntries = entries =>
  entries.map(([key, value]) => {
    if (Array.isArray(value)) return { [key]: convertArrayValuesToInt(value) }
    if (typeof value === 'object') return { [key]: convertJSONValuesToNumbers(value) }
    return { [key]: value |> getConvertedValue }
  })

const mergeEntries = entries =>
  entries.reduce(
    (convertedJson, entry) => ({
      ...convertedJson,
      ...entry,
    }),
    {}
  )

export const convertJSONValuesToNumbers = json => Object.entries(json) |> convertJSONEntries |> mergeEntries

export default (req, res) => {
  const { headers, body = {} } = req
  const { query } = parse(req.url, true)
  const { fallbackUrl } = query
  const uri = `${headers['x-forwarded-proto']}://${headers['x-forwarded-host']}`
  const redirectTo = redirectWith(res)

  const { mutation, ...variables } = body
  if (!mutation) return redirectTo(new Error('No mutation provided'), `${uri}/`)

  console.log('wow', variables |> convertJSONValuesToNumbers)
  const MUTATION = gql(mutation)
  const client = new ApolloClient({
    credentials: 'same-origin',
    uri: `${uri}/graphql`,
    resolvers: {
      Mutation,
    },
    fetch,
  })
  client
    .mutate({
      mutation: MUTATION,
      variables: variables |> convertJSONValuesToNumbers,
    })
    .then(() => redirectTo(null, `${uri}/${fallbackUrl}`))
    .catch(error => redirectTo(error, `${uri}/`))
}
