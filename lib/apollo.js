import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import Mutation from './mutations'

// can also be a function that accepts a `context` object (SSR only) and returns a config
const getUrl = context => {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    return `${protocol}//${host}/graphql`
  }
  if (!context) return '/graphql'

  const { req } = context
  const { headers } = req
  const host = `${headers['x-forwarded-proto']}://${
    headers['x-forwarded-host']
  }/graphql`
  return host
}

const config = context => {
  const uri = getUrl(context)
  const commonConfig = {
    link: new HttpLink({
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      uri,
    }),
    resolvers: {
      Mutation,
    },
  }
  if (typeof window !== 'undefined') {
    const cache = new InMemoryCache({})

    persistCache({
      cache,
      storage: window.localStorage,
    })
    return {
      cache,
      ...commonConfig,
    }
  }
  return commonConfig
}

export default withData(config)
