import React from 'react';
import ReactDOM from 'react-dom';
import  AppWithData from './app';
import { ApolloProvider } from 'react-apollo';
import {client} from './apolloClient.js';

ReactDOM.render(
	<ApolloProvider client = {client}>
		<AppWithData />
	</ApolloProvider>,
	document.getElementById('app')
)
