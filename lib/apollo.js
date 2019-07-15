import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'

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
  return {
    link: new HttpLink({
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      uri,
    }),
  }
}

export default withData(config)
