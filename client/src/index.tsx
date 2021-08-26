import ReactDOM from 'react-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { GRAPHQL_SERVICE_URL } from './app/app.constants';
import App from './app/app';
import './index.css';

export const apolloClient = new ApolloClient({
  uri: GRAPHQL_SERVICE_URL,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
