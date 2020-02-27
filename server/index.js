const { round } = require('../game/battle-round')

const { ApolloServer, gql } = require('apollo-server-micro')

const typeDefs = gql`
  type Move {
    type: String
    power: Int
  }

  type Players {
    p1: Player
    p2: Player
  }

  type Player {
    hp: Int
    stamina: Int
    moves: [Move]
  }

  type Query {
    hello: String
  }

  type Mutation {
    login(userName: String, password: String): String
    calculate(players: Players): Players
  }
`

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello world! It's your boy, how far now unicodeveloper"
    },
  },
  Mutation: {
    login: (root, { userName }, context) => {
      return `Hello ${userName}! Welcome back!`
    },
    calculate: (root, { players }) => {
      return round(players)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  // This is the apollo server
  ssrMode: true,
})

module.exports = server.createHandler()
