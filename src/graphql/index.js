import { ApolloClient, split, createHttpLink, InMemoryCache, } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { config } from '../config';
import { LocalStorageKeys } from '../utils';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: config.api_url,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(LocalStorageKeys.authToken);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink({
  uri: config.graphql_web_socket_url,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(LocalStorageKeys.authToken),
    },
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export { client };