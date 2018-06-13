const { GraphQLServer, PubSub } = require('graphql-yoga')
const Controllers = require('./controllers');

const CHANNEL_MESSAGE_CREATE = 'Message Created';

/**
 * Resolvers
 */
const resolvers = {
  Query: {
    messages: () => Controllers.Message.getAllMessages(),
    rooms: () => Controllers.Room.getAllRooms(),
  },
  Mutation: {
    createMessage: (root, args, { pubsub }) => {
      return Controllers.Message.createMessage(args)
        .then(message => {
          pubsub.publish(CHANNEL_MESSAGE_CREATE, {messageCreated: message.dataValues});
          return message;
        })
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: (root, args, { pubsub }) => pubsub.asyncIterator(CHANNEL_MESSAGE_CREATE)
    }
  }
}

/**
 * Bundle graphql server.
 */
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers,
  context: { pubsub },
})

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
})


