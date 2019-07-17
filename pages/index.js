import Head from 'next/head'
import Link from 'next/link'
import material from 'materialize-css/sass/materialize.scss'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Header from '../components/header'
import withData from '../lib/apollo'

export const helloWorld = gql`
  {
    userName @client
  }
`

function Index() {
  return (
    <Query query={helloWorld}>
      {({ loading, error, data: { userName }, fetchMore }) => (
        <main>
          <Head>
            <title>Sync Battle</title>
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
          </Head>
          <Header />
          <section className="content">
            <Link href="/about">
              <a>{userName}</a>
            </Link>
          </section>
          <style jsx>{`
            ${material}
            .content {
            }
          `}</style>
        </main>
      )}
    </Query>
  )
}

export default withData(Index)
