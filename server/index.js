const { ApolloServer, gql } = require("apollo-server-micro");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    login(userName: String, password: String): String
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello world! It's your boy, how far now unicodeveloper";
    }
  },
  Mutation: {
    login: (root, { userName }, context) => {
      return `Hello ${userName}! Welcome back!`;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = server.createHandler();
