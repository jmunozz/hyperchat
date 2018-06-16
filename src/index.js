const { GraphQLServer, PubSub } = require('graphql-yoga');
const Resolvers = require('./graphql/resolvers');

/**
 * Instanciate PubSub server
 */
const pubsub = new PubSub();

/**
 * Bundle graphql server.
 */
const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers: Resolvers,
  context: { pubsub },
});

server.start(() => {
  console.log('Server is running on http://localhost:4000');
});

