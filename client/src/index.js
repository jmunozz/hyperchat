import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import  { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';


import './index.css';
import App from './components/App/App';

const cache = new InMemoryCache();

// Create an http link:
const httpLink = new HttpLink({
    uri: `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
  });
  
  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `ws://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/`,
    options: {
      reconnect: true
    }
  });
  
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
      console.log('operation', operation)
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

// Create client.
const client = new ApolloClient({
    link,
    cache,
});

ReactDOM.render(    
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
document.getElementById('root'));
