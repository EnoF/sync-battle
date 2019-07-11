const { ApolloServer, gql } = require("apollo-server-micro");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    saveName(name: String): String
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello world! It's your boy, how far now unicodeveloper";
    }
  },
  Mutation: {
    saveName: (root, args, context) => {
      return `Hello ${args.name}! Your name has been saved!`;
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
