const { GraphQLServer } = require('graphql-yoga')
const Controllers = require('./controlers');

/**
 * Resolvers
 */
const resolvers = {
  Query: {
    messages: () => Controllers.Message.getAllMessages(),
    rooms: () => Controllers.Room.getAllRooms(),
  },
  Mutation: {
    createMessage: (root, args) => Controllers.Message.createMessage(args)
  },
}

/**
 * Bundle graphql server.
 */
const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers
})

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
})


