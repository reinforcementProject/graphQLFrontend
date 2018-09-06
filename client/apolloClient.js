
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

const httpLink = new HttpLink({
	uri: '/graphql'
});

const link = ApolloLink.from([httpLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
	link,
	cache
});
